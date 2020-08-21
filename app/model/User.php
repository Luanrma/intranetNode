<?php

class User {

    private $idUser;
    private $login;
    private $name;
    private $pass;
    private $email;
    private $bio;
    private $dtCreate;

    public function getIdUser() {return $this->idUser;}
    public function setIdUser($idUser) {$this->idUser = $idUser;}

    public function getLogin() {return $this->login;}
    public function setLogin($login) {$this->login = $login;}
    
    public function getName() {return $this->name;}
    public function setName($name) {$this->name = $name;}
    
    public function getPass() {return $this->pass;}
    public function setPass($pass) {$this->pass = $pass;}
    
    public function getEmail() {return $this->email;}
    public function setEmail($email) {$this->email = $email;}

    public function getBio() {return $this->bio;}
    public function setBio($bio) {$this->bio = $bio;}

    public function getDtCreate() {return $this->dtCreate;}
    public function setDtCreate($dtCreate) {$this->dtCreate = $dtCreate;}

    //Seleciona pessoa por ID
    public function loadById($id) {

        $sql = new Sql();

        $results = $sql->select("SELECT * FROM users where ID_USER = :ID", array(
            ":ID"=>$id
        ));

        if (count($results) > 0) {

            $this->setData($results[0]);

        }
    }

    //Retorna todas as pessoas cadastradas
    public static function getList() {

        $sql = new Sql();

        return $sql->select("SELECT * FROM users ORDER BY USERNAME;");
    }

    //Pesquisa pessoa pelo nome
    public static function search($login) {

        $sql = new Sql();

        return $sql->select("SELECT * FROM users WHERE USERNAME like :SEARCH ORDER BY USERNAME", array(

            ':SEARCH'=>"%".$login."%"

        ));
    }

    //Login
    public function login($email, $pass) {

        $sql = new Sql();

        $results = $sql->select("SELECT * FROM users where EMAIL = :EMAIL AND PASS = :PASS", array(
            ":EMAIL"=>$email,
            ":PASS"=>$pass
        ));

        if (count($results) > 0) {

            $this->setData($results[0]);

        } else {

            throw new Exception("Error Processing Request");

        }

    }

    //Cria um cadastro
    public function insert($username, $email, $login, $pass, $bio = "") {

        $this->setName($username);
        $this->setEmail($email);
        $this->setLogin($login);
        $this->setPass($pass);
        $this->setBio($bio); 

        $sql = new Sql();

        $results = $sql->insert("INSERT INTO users (USERNAME, LOGIN, PASS, EMAIL, BIO) VALUES (:username, :login, :pass, :email, :bio)", array(
            ':username'=>$this->getName(),
            ':email'=>$this->getEmail(),
            ':login'=>$this->getLogin(),
            ':pass'=>$this->getPass(),
            ':bio'=>$this->getBio()
        ));

        return $this->login($email, $pass); 
    }

    //Atualizar um cadastro
    public function update($username, $email, $login, $pass, $bio = "") {

        $this->setName($username);
        $this->setEmail($email);
        $this->setLogin($login);
        $this->setPass($pass);
        $this->setBio($bio);        
       
        $sql = new Sql();

        $sql->query("UPDATE users SET USERNAME = :username, EMAIL = :email, LOGIN = :login, PASS = :pass, BIO = :bio WHERE ID_USER = :iduser", array(
            ':username'=>$this->getName(),
            ':email'=>$this->getEmail(),
            ':login'=>$this->getLogin(),
            ':pass'=>$this->getPass(),
            ':bio'=>$this->getBio(),
            ':iduser'=>$this->getIdUser()
        ));

    }

    //Método auxiliar para atribuir valor aos atributos
    public function setData($data) {

        $this->setIdUser($data['ID_USER']);
        $this->setName($data['USERNAME']);
        $this->setPass($data['PASS']);
        $this->setEmail($data['EMAIL']);
        $this->setDtCreate(new DateTime($data['DT_CREATE']));
    }

    //Método auxiliar para transformar todo retorno em um JSON
    public function __toString() {

        return json_encode(array(
            "ID_USER"=>$this->getIdUser(),
            "USERNAME"=>$this->getName(),
            "PASS"=>$this->getPass(),
            "EMAIL"=>$this->getEmail(),
            "DT_CREATE"=>$this->getDtCreate()->format("d/m/Y - H:i:s")
        ));
    }

}