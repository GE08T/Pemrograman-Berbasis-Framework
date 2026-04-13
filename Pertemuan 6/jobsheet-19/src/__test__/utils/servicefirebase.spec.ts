import { beforeEach, describe, expect, it, jest } from "@jest/globals";

jest.mock("@/utils/db/firebase", () => ({
  __esModule: true,
  default: {},
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(() => ({})),
  collection: jest.fn(() => "collection-ref"),
  getDocs: jest.fn(),
  getDoc: jest.fn(),
  doc: jest.fn(() => "doc-ref"),
  query: jest.fn(() => "query-ref"),
  addDoc: jest.fn(),
  where: jest.fn(() => "where-ref"),
  updateDoc: jest.fn(),
}));

jest.mock("bcrypt", () => ({
  __esModule: true,
  default: {
    hash: jest.fn(),
  },
}));

const firestore = jest.requireMock("firebase/firestore") as {
  collection: jest.Mock;
  getDocs: jest.Mock;
  getDoc: jest.Mock;
  doc: jest.Mock;
  query: jest.Mock;
  addDoc: jest.Mock;
  where: jest.Mock;
  updateDoc: jest.Mock;
};

const bcryptMock = jest.requireMock("bcrypt") as {
  default: {
    hash: jest.Mock;
  };
};

const serviceFirebase = jest.requireActual("@/utils/db/servicefirebase") as {
  retriveProducts: (collectionName: string) => Promise<unknown[]>;
  retriveDataByID: (collectionName: string, id: string) => Promise<unknown>;
  signIn: (email: string) => Promise<unknown>;
  signUp: (
    userData: {
      email: string;
      fullname: string;
      password: string;
      role?: string;
    },
    callback: Function,
  ) => Promise<void>;
  signInWithGoogle: (userData: unknown, callback: Function) => Promise<void>;
  signInWithGithub: (userData: unknown, callback: Function) => Promise<void>;
};

describe("servicefirebase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("retriveProducts returns mapped products", async () => {
    firestore.getDocs.mockResolvedValue({
      docs: [
        { id: "1", data: () => ({ name: "Laptop" }) },
        { id: "2", data: () => ({ name: "Mouse" }) },
      ],
    });

    const result = await serviceFirebase.retriveProducts("products");

    expect(firestore.collection).toHaveBeenCalled();
    expect(firestore.getDocs).toHaveBeenCalled();
    expect(result).toEqual([
      { id: "1", name: "Laptop" },
      { id: "2", name: "Mouse" },
    ]);
  });

  it("retriveDataByID returns single document data", async () => {
    firestore.getDoc.mockResolvedValue({
      data: () => ({ name: "Keyboard" }),
    });

    const result = await serviceFirebase.retriveDataByID("products", "1");

    expect(firestore.doc).toHaveBeenCalled();
    expect(firestore.getDoc).toHaveBeenCalled();
    expect(result).toEqual({ name: "Keyboard" });
  });

  it("signIn returns first user when found", async () => {
    firestore.getDocs.mockResolvedValue({
      docs: [{ id: "u1", data: () => ({ email: "a@mail.com" }) }],
    });

    const result = await serviceFirebase.signIn("a@mail.com");

    expect(firestore.query).toHaveBeenCalled();
    expect(firestore.where).toHaveBeenCalledWith("email", "==", "a@mail.com");
    expect(result).toEqual({ id: "u1", email: "a@mail.com" });
  });

  it("signIn returns null when user not found", async () => {
    firestore.getDocs.mockResolvedValue({ docs: [] });

    const result = await serviceFirebase.signIn("none@mail.com");

    expect(result).toBeNull();
  });

  it("signUp returns error when user already exists", async () => {
    const callback = jest.fn();
    firestore.getDocs.mockResolvedValue({
      docs: [{ id: "u1", data: () => ({ email: "exists@mail.com" }) }],
    });

    await serviceFirebase.signUp(
      { email: "exists@mail.com", fullname: "A", password: "secret123" },
      callback,
    );

    expect(callback).toHaveBeenCalledWith({
      status: "error",
      message: "User already exists",
    });
  });

  it("signUp hashes password and stores new user", async () => {
    const callback = jest.fn();
    firestore.getDocs.mockResolvedValue({ docs: [] });
    bcryptMock.default.hash.mockResolvedValue("hashed-password");
    firestore.addDoc.mockResolvedValue({ id: "u2" });

    await serviceFirebase.signUp(
      { email: "new@mail.com", fullname: "B", password: "secret123" },
      callback,
    );

    expect(bcryptMock.default.hash).toHaveBeenCalledWith("secret123", 10);
    expect(firestore.addDoc).toHaveBeenCalledWith("collection-ref", {
      email: "new@mail.com",
      fullname: "B",
      password: "hashed-password",
      role: "member",
    });
    expect(callback).toHaveBeenCalledWith({
      status: "success",
      message: "User registered successfully",
    });
  });

  it("signUp returns callback error when addDoc fails", async () => {
    const callback = jest.fn();
    firestore.getDocs.mockResolvedValue({ docs: [] });
    bcryptMock.default.hash.mockResolvedValue("hashed-password");
    firestore.addDoc.mockRejectedValue(new Error("firestore error"));

    await serviceFirebase.signUp(
      { email: "new@mail.com", fullname: "B", password: "secret123" },
      callback,
    );

    expect(callback).toHaveBeenCalledWith({
      status: "error",
      message: "firestore error",
    });
  });

  it("signInWithGoogle updates existing user", async () => {
    const callback = jest.fn();
    firestore.getDocs.mockResolvedValue({
      docs: [{ id: "u1", data: () => ({ role: "admin" }) }],
    });
    firestore.updateDoc.mockResolvedValue(undefined);

    await serviceFirebase.signInWithGoogle(
      {
        email: "google@mail.com",
        fullname: "Google User",
        type: "google",
      },
      callback,
    );

    expect(firestore.updateDoc).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(
      expect.objectContaining({
        status: true,
        message: "User registered and logged in with Google",
        data: expect.objectContaining({ role: "admin" }),
      }),
    );
  });

  it("signInWithGithub creates new user when not found", async () => {
    const callback = jest.fn();
    firestore.getDocs.mockResolvedValue({ docs: [] });
    firestore.addDoc.mockResolvedValue({ id: "u3" });

    await serviceFirebase.signInWithGithub(
      {
        email: "github@mail.com",
        fullname: "Github User",
        type: "github",
      },
      callback,
    );

    expect(firestore.addDoc).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(
      expect.objectContaining({
        status: true,
        message: "User registered and logged in with Github",
        data: expect.objectContaining({ role: "member" }),
      }),
    );
  });

  it("oauth callback returns failed status on unexpected error", async () => {
    const callback = jest.fn();
    firestore.getDocs.mockRejectedValue(new Error("query failed"));

    await serviceFirebase.signInWithGoogle(
      {
        email: "fail@mail.com",
        fullname: "Fail User",
        type: "google",
      },
      callback,
    );

    expect(callback).toHaveBeenCalledWith({
      status: false,
      message: "Failed to register user with Google",
    });
  });
});
