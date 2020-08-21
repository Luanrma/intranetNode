<?php

class User {

    private $idUser;
    private $name;
    private $pass;
    private $email;
    private $bio;
    private $dtCreate;

    public function getIdUser() {return $this->idUser;}
    public function setIdUser($idUser) {$this->idUser = $idUser;}
    
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

    public function loadById($id) {

        $sql = new Sql();

        $results = $sql->select("SELECT * FROM users where ID_USER = :ID", array(
            ":ID"=>$id
        ));

        if (count($results) > 0) {

            $row = $results[0];

            $this->setIdUser($row['ID_USER']);
            $this->setName($row['USER']);
            $this->setPass($row['PASS']);
            $this->setEmail($row['EMAIL']);
            $this->setDtCreate(new DateTime($row['DT_CREATE']));
        }
    }

    public static function getList() {

        $sql = new Sql();

        return $sql->select("SELECT * FROM users ORDER BY USER;");
    }

    public static function search($login) {

        $sql = new Sql();

        return $sql->select("SELECT * FROM users WHERE USER like :SEARCH ORDER BY USER", array(

            ':SEARCH'=>"%".$login."%"

        ));
    }

    public function login($email, $pass) {

        $sql = new Sql();

        $results = $sql->select("SELECT * FROM users where EMAIL = :EMAIL AND PASS = :PASS", array(
            ":EMAIL"=>$email,
            ":PASS"=>$pass
        ));

        if (count($results) > 0) {

            $row = $results[0];

            $this->setIdUser($row['ID_USER']);
            $this->setName($row['USER']);
            $this->setPass($row['PASS']);
            $this->setEmail($row['EMAIL']);
            $this->setDtCreate(new DateTime($row['DT_CREATE']));

        } else {

            throw new Exception("Error Processing Request");

        }

    }

    public function __toString() {

        return json_encode(array(
            "ID_USER"=>$this->getIdUser(),
            "USER"=>$this->getName(),
            "PASS"=>$this->getPass(),
            "EMAIL"=>$this->getEmail(),
            "DT_CREATE"=>$this->getDtCreate()->format("d/m/Y - H:i:s")
        ));
    }

}