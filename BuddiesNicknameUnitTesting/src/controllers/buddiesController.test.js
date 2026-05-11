import { jest } from "@jest/globals";
/** 
 * mock
 **/
const mockGetAll = jest.fn();
const mockCreate = jest.fn();
const mockRemove = jest.fn();

const mockLogger = {
  info: jest.fn(),
  error: jest.fn(),
};

/**
 * mock modules
 **/
await jest.unstable_mockModule("../services/buddiesService.js", () => ({
  getAll: mockGetAll,
  getOne: jest.fn(),
  create: mockCreate,
  update: jest.fn(),
  remove: mockRemove,
}));

await jest.unstable_mockModule("../config/logger.js", () => ({ default: mockLogger, }));
const { getAllBuddies, addBuddy, deleteBuddy } = await import("./buddiesController.js");

/**
 * tests
 **/
describe("Buddies Controller", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {user: {role: "admin",employeeID: "EMP001",},body: {},params: {},};
    res = {status: jest.fn().mockReturnThis(),json: jest.fn(),};
    jest.clearAllMocks();
  });

  /**
   * get all buddies test
   **/
  describe("getAllBuddies", () => {
    it("should return all buddies", async () => {
      mockGetAll.mockResolvedValue({status: 200,data: [{ id: 1 }],});
      await getAllBuddies(req, res);
      expect(mockGetAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
    });
    
    //block non admin test
    it("should block non-admin", async () => {
      req.user.role = "user";
      await getAllBuddies(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
    });
  });

  /**
   * add buddy test
   **/
  describe("addBuddy", () => {
    it("should create buddy", async () => {
      req.body = { name: "Preni" };
      mockCreate.mockResolvedValue({status: 201,data: { success: true },});
      await addBuddy(req, res);
      expect(mockCreate).toHaveBeenCalledWith({name: "Preni",});
    });
  });

  /**
   *delete buddy test
   */
  describe("deleteBuddy", () => {
    it("should delete buddy", async () => {
      req.params.employeeID = "EMP123";
      mockRemove.mockResolvedValue({status: 200,data: { success: true },});
      await deleteBuddy(req, res);
      expect(mockRemove).toHaveBeenCalledWith("EMP123");
    });
  });
});