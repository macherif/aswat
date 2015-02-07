<?php
/**
 * @file image.php
 * @author macherif <maccherif2001@gmail.com>
 * @copyright This App is builded only for test purpose requested by ASWAT TELECOM DEV TEAM 2015
 * @version 1 <This's the first release  >
 * @package models
 * @return object < Image Entity>
 * @todo
 */
namespace Application\Models;
class Image  {
    protected $_id;
    protected $_imageName;
    protected $_width;
    protected $_height;
    protected $_alt;
    protected $_title;

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
     * setter of $_imageName 
     */
    public function setImageName($imageName)
    {
        $this->_imageName = $imageName;
        return $this;
    }
    public function setWidth($width)
    {
        $this->_width = $width;
        return $this;
    }
    public function setHeight($height)
    {
        $this->_height = $height;
        return $this;
    }
    public function setAlt ($alt)
    {
        $this->_alt = $alt;
        return $this;
    }
    public function setTitle ($title)
    {
        $this->_title = $title;
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
     * getter of $_imageName 
     */
    public function getImageName()
    {
        return $this->_imageName;
    }
    public function getWidth()
    {
        return $this->_width;
    }
    public function getHeight()
    {
        return $this->_height;
    }
    public function getAlt ()
    {
        return $this->_alt;
    }
    public function getTitle ()
    {
        return $this->_title;
    }
    
}
?>