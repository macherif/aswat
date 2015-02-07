<?php
/**
 * @file category.php
 * @author macherif <maccherif2001@gmail.com>
 * @copyright This App is builded only for test purpose requested by ASWAT TELECOM DEV TEAM 2015
 * @version 1 <This's the first release  >
 * @package models
 * @return object < Category Entity>
 * @todo
 */
namespace Application\Models;
class Category {
    protected $_id;
    protected $_categoryName;
    protected $_enabled;
    protected $_parentId;

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
     * setter of $_categoryName 
     */
    public function setCategoryName($categoryName)
    {
        $this->_categoryName = $categoryName;
        return $this;
    }
    public function setEnabled($enabled)
    {
        $this->_enabled = $enabled;
        return $this;
    }
    public function setParentId($parentId)
    {
        $this->_parentId = $parentId;
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
    public function getCategoryName()
    {
        return $this->_categoryName;
    }
    public function getEnabled()
    {
        return $this->_enabled;
    }
    public function getParentId()
    {
        return $this->_parentId;
    }
}
?>