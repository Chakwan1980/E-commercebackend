import { addproducts, getAllproducts, deleteUser, updateUser } from "../controllers/productsController.js";
import { pool } from "../db.js"; // Asegúrate de importar las funciones mockeadas
import { responseHelper } from "../utils/responseHelper.js";

// Mock de las funciones
jest.mock('../db.js', () => ({
  addproducts: jest.fn(),
  getAllproducts: jest.fn(),
  deleteproductsById: jest.fn(),
  putUserById: jest.fn(),
}));

// Mock de responseHelper si es necesario
jest.mock('../utils/responseHelper.js', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe("User Controller Tests", () => {

  afterEach(() => {
    jest.clearAllMocks(); // Limpiar los mocks después de cada test
  });

  test("addproducts should return success with user data", async () => {
    // Preparar datos de prueba
    const mockUser = { id: 1, nombre: 'John', apellido: 'Doe', email: 'john.doe@example.com' };
    const req = { body: mockUser };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    
    pool.addproducts.mockResolvedValue(mockUser); // Simular la respuesta de la base de datos
    
    // Ejecutar controlador
    await addproducts(req, res);
    
    // Verificar que la respuesta fue correcta
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "User created successfully", data: mockUser });
  });

  test("getAllproducts should return success with user data", async () => {
    // Preparar datos de prueba
    const mockproducts = [
      { id: 1, nombre: 'John', apellido: 'Doe', email: 'john.doe@example.com' },
      { id: 2, nombre: 'Jane', apellido: 'Doe', email: 'jane.doe@example.com' }
    ];
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    
    pool.getAllproducts.mockResolvedValue(mockproducts); // Simular la respuesta de la base de datos
    
    // Ejecutar controlador
    await getAllproducts(req, res);
    
    // Verificar que la respuesta fue correcta
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "products fetched successfully", data: mockproducts });
  });

  test("deleteUser should return success when user is deleted", async () => {
    const req = { params: { id: '1' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    
    const mockDeletedUser = { id: 1, nombre: 'John', apellido: 'Doe', email: 'john.doe@example.com' };
    
    pool.deleteproductsById.mockResolvedValue([mockDeletedUser]); // Simular que el usuario fue eliminado
    
    await deleteUser(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "User deleted successfully", data: [mockDeletedUser] });
  });

  test("deleteUser should return 404 when user not found", async () => {
    const req = { params: { id: '1' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    
    pool.deleteproductsById.mockResolvedValue([]); // Simular que no se encontró el usuario
    
    await deleteUser(req, res);
    
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  test("updateUser should return updated user data", async () => {
    const req = { 
      params: { id: '1' },
      body: { nombre: 'John', apellido: 'Doe', email: 'john.doe@example.com', telefono: '1234567890', direccion: 'Some address' }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    
    const mockUpdatedUser = { id: 1, nombre: 'John', apellido: 'Doe', email: 'john.doe@example.com', telefono: '1234567890', direccion: 'Some address' };
    
    pool.putUserById.mockResolvedValue(mockUpdatedUser); // Simular que el usuario fue actualizado
    
    await updateUser(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "User updated successfully", data: mockUpdatedUser });
  });

  test("updateUser should return 404 when user not found", async () => {
    const req = { 
      params: { id: '1' },
      body: { nombre: 'John', apellido: 'Doe', email: 'john.doe@example.com', telefono: '1234567890', direccion: 'Some address' }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    
    pool.putUserById.mockResolvedValue(null); // Simular que no se encontró el usuario
    
    await updateUser(req, res);
    
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

});
