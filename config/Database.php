<?php

class Database{
    private $host = DB_HOST;
    private $user = DB_USER;
    private $pass = DB_PASS;
    private $name = DB_NAME;
    private $conn;

    public function connect(){
        $this->conn = null;
        try {
            $this -> conn = new PDO(
                "mysql:host=". $this->host. ";dbname=". $this->name,
                $this->user,
                $this->pass
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "error en la coneccion" . $e->getMessage();
    


        }
        return $this->conn;
    }
    

}