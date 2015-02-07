<?php
/**
 * @file product.php
 * @author macherif <maccherif2001@gmail.com>
 * @copyright This App is builded only for test purpose requested by ASWAT TELECOM DEV TEAM 2015
 * @version 1 <This's the first release  >
 * @package models
 * @return object < Product Entity>
 * @todo
 */
namespace Application\Models;
class Product {
    protected $_id;
    protected $_productName;
    protected $_teaser;
    protected $_description;
    protected $_imageId;
    protected $_categoryId;
    protected $_price;

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
     * setter of $_productName 
     */
    public function setProductName($productName)
    {
        $this->_productName = $productName;
        return $this;
    }
    public function setTeaser($teaser)
    {
        $this->_teaser = $teaser;
        return $this;
    }
    public function setDescription($description)
    {
        $this->_description = $description;
        return $this;
    }
    public function setImageId ($imageId)
    {
        $this->_imageId = $imageId;
        return $this;
    }
    public function setCategoryId ($categoryId)
    {
        $this->_categoryId = $categoryId;
        return $this;
    }
    public function setPrice ($price)
    {
        $this->_price = $price;
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
     * getter of $_productName 
     */
    public function getProductName()
    {
        return $this->_productName;
    }
    public function getTeaser()
    {
        return $this->_teaser;
    }
    public function getDescription()
    {
        return $this->_description;
    }
    public function getImageId ()
    {
        return $this->_imageId;
    }
    public function getCategoryId ()
    {
        return $this->_categoryId;
    }
    public function getPrice ()
    {
        return $this->_price;
    }
    
}
?>