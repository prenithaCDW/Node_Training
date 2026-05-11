import { jest } from "@jest/globals";
const { signup, login, logout } = await import("../services/authService.js");
/** 
 * mock
 **/
const mockFindOne = jest.fn();
const mockCreate = jest.fn();
const mockUpdateOne = jest.fn();
const mockBcryptHash = jest.fn();
const mockBcryptCompare = jest.fn();
const mockJwtSign = jest.fn();

const mockUserModel = {
    findOne: mockFindOne,
    create: mockCreate,
    updateOne: mockUpdateOne,
};

/**
 * mock modules
 **/
await jest.unstable_mockModule("../models/user.js", () => ({ default: mockUserModel, }));
await jest.unstable_mockModule("bcryptjs", () => ({ default: { hash: mockBcryptHash, compare: mockBcryptCompare, }, }));
await jest.unstable_mockModule("jsonwebtoken", () => ({ default: { sign: mockJwtSign, }, }));

/**
 * tests
 **/
describe("Auth Service", () => {
    beforeEach(() => { jest.clearAllMocks(); });

    /**
     *signup tests
    */
    describe("signup", () => {
        it("should fail if missing fields", async () => {
            const result = await signup({ employeeID: "" });
            expect(result.status).toBe(400);
        });

        it("should fail if user already exists", async () => {
            mockFindOne.mockResolvedValue({ employeeID: "EMP001" });
            const result = await signup({ employeeID: "EMP001", password: "123", });
            expect(result.status).toBe(400);
        });

        it("should create user successfully", async () => {
            mockFindOne.mockResolvedValue(null);
            mockBcryptHash.mockResolvedValue("hashedpass");
            mockCreate.mockResolvedValue({ employeeID: "EMP001", role: "user", });
            const result = await signup({ employeeID: "EMP001", password: "123", role: "user", });
            expect(mockCreate).toHaveBeenCalled();
            expect(result.status).toBe(201);
            expect(result.data.user.employeeID).toBe("EMP001");
        });
    });

    /**
     * login tests
     **/
    describe("login", () => {
        it("should fail if user not found", async () => {
            mockFindOne.mockResolvedValue(null);
            const result = await login("EMP001", "123");
            expect(result.status).toBe(401);
        });

        it("should fail if password incorrect", async () => {
            mockFindOne.mockResolvedValue({ employeeID: "EMP001", password: "hashed", });
            mockBcryptCompare.mockResolvedValue(false);
            const result = await login("EMP001", "wrong");
            expect(result.status).toBe(401);
        });

        it("should login successfully", async () => {
            mockFindOne.mockResolvedValue({ employeeID: "EMP001", password: "hashed", role: "user", tokenState: 0, });
            mockBcryptCompare.mockResolvedValue(true);
            mockJwtSign.mockReturnValue("fakeToken");
            const result = await login("EMP001", "123");
            expect(mockJwtSign).toHaveBeenCalled();
            expect(result.status).toBe(200);
            expect(result.data.token).toBe("fakeToken");
        });
    });

    /**
     * logout test
     **/
    describe("logout", () => {
        it("should increment tokenState", async () => {
            mockUpdateOne.mockResolvedValue({ modifiedCount: 1 });
            const result = await logout("EMP001");
            expect(mockUpdateOne).toHaveBeenCalledWith(
                { employeeID: "EMP001" },
                { $inc: { tokenState: 1 } }
            );
            expect(result.status).toBe(200);
        });
    });
});