<?php
class ProductoController
{
    private $db;
    private $producto;




    public function __construct() 
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
      $datebase = new Database();
      $this->db = $datebase->connect();
      $this-> producto = new Producto($this->db); 
    }




    public function index(){

        include 'views/layouts/header.php';
        include 'views/producto/index.php';
        include 'views/layouts/footer.php';

        
    }

    public function obtenerProducto(){
        header('Content-Type: application/json');
        try {
            $resultado = $this-> producto->obtenerProducto();
            $productos = $resultado->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode([
                'status'=> 'success', 
                'data' => $productos
            ]);
        } catch (Exception $e) {
            echo json_encode([
                'status'=> 'error', 
                'message' => $e->getMessage() 
            ]);
        }
    }

   ///////////////////////////////////
   public function crear() {
    header('Content-Type: application/json');

    try {
        // Obtiene los datos del cuerpo de la petición.
        $data = json_decode(file_get_contents("php://input"));

        // Valida que todos los campos requeridos estén presentes.
        if (
            empty($data->nombre) || 
            empty($data->descripcion) ||
            empty($data->precio) ||
            empty($data->stock) ||
            empty($data->imagen)
        ) {
            throw new Exception('Todos los campos son requeridos.');
        }

        // Prepara los datos para insertar en la base de datos.
        $productoData = [
            "nombre" => $data->nombre,
            "descripcion" => $data->descripcion,
            "precio" => $data->precio,
            "stock" => $data->stock,
            "imagen" => $data->imagen,
        ];

        // Inserta el producto usando el modelo.
        if ($this->producto->crearProducto($productoData)) {
            echo json_encode([
                'status' => 'success',
                'message' => 'Producto registrado correctamente.',
            ]);
        } else {
            throw new Exception('Error al registrar el producto.');
        }

    } catch (Exception $e) {
        // Devuelve el error como respuesta JSON.
        echo json_encode([
            'status' => 'error',
            'message' => $e->getMessage()
        ]);
    }
}
  
}