<?php
/**
 * @file role.php
 * @author macherif <maccherif2001@gmail.com>
 * @copyright This App is builded only for test purpose requested by ASWAT TELECOM DEV TEAM 2015
 * @version 1 <This's the first release  >
 * @package models
 * @return object < Role Entity>
 * @todo
 */
namespace Application\Models;
class Role {
    protected $_id;
    protected $_role;
    protected $_enabled;

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
     * setter of $_role 
     */
    public function setRole($role)
    {
        $this->_role = $role;
        return $this;
    }
    public function setEnabled($enabled)
    {
        $this->_enabled = $enabled;
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
    public function getRole()
    {
        return $this->_role;
    }
    public function getEnabled()
    {
        return $this->_enabled;
    }
}
?>