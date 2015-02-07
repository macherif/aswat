<?php
/**
 * @file order.php
 * @author macherif <maccherif2001@gmail.com>
 * @copyright This App is builded only for test purpose requested by ASWAT TELECOM DEV TEAM 2015
 * @version 1 <This's the first release  >
 * @package models
 * @return object < Order Entity>
 * @todo
 */
namespace Application\Models;
class Order {
    protected $_id;
    protected $_userId;
    protected $_purchased;
    protected $_purchaseDate;
    protected $_amount;

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
     * setter of $_userId 
     */
    public function setUserId($userId)
    {
        $this->_userId = $userId;
        return $this;
    }
    public function setPurchased($purchased)
    {
        $this->_purchased = $purchased;
        return $this;
    }
    public function setPurchaseDate($purchaseDate)
    {
        $this->_purchaseDate = $purchaseDate;
        return $this;
    }
    public function setAmount($amount)
    {
        $this->_amount = $amount;
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
    /*
     * getter of $_userId 
     */
    public function getUserId()
    {
        return $this->_userId ;
    }
    public function getPurchased()
    {
        return $this->_purchased = $purchased ;
    }
    public function getPurchaseDate()
    {
        return $this->_purchaseDate ;
    }
    public function getAmount()
    {
        return $this->_amount;
    }
}
?>