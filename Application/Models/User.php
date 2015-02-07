<?php
/**
 * @file user.php
 * @author macherif <maccherif2001@gmail.com>
 * @copyright This App is builded only for test purpose requested by ASWAT TELECOM DEV TEAM 2015
 * @version 1 <This's the first release  >
 * @package models
 * @return object < User Entity>
 * @todo
 */
namespace Application\Models;
class User {
    protected $_id;
    protected $_login;
    protected $_password;
    protected $_email;
    protected $_created;
    protected $_enabled;
    protected $_imageId;
    protected $_roleId;

    function __construct() {

    }
    
    #################################
    #           SETTERS             #
    #################################
    /**
     * setter of $id 
     */
    public function setId($id)
    {
        $this->_id = $id;
        return $this;
    }
    /**
     * setter of $login 
     */
    public function setLogin($login)
    {
        $this->_login = $login;
        return $this;
    }
    public function setPassword($password)
    {
        $this->_password = $password;
        return $this;
    }
    public function setEmail($email)
    {
        $this->_email = $email;
        return $this;
    }
    public function setCreated ($created)
    {
        $this->_created = $created;
        return $this;
    }
    public function setEnabled ($enabled)
    {
        $this->_enabled = $enabled;
        return $this;
    }
    public function setImageId ($îmageId)
    {
        $this->_imageId = $îmageId;
        return $this;
    }
    public function setRoleId($roleId)
    {
        $this->_roleId = $roleId;
        return $this;
    }
    #################################
    #           GETTERS             #
    #################################
    /**
     * getter of $id 
     */
    public function getId()
    {
        return $this->_id;
    }
    /**
     * getter of $login 
     */
    public function getLogin()
    {
        return $this->_login;
    }
    public function getPassword()
    {
       return $this->_password;
    }
    public function getEmail()
    {
        return $this->_email;
    }
    public function getCreated ()
    {
       return $this->_created;
    }
    public function getEnabled ()
    {
        return $this->_enabled;
    }
    public function getImageId ()
    {
        return $this->_imageId;
    }
    public function getRoleId()
    {
        return $this->_roleId;
    }
}
?>