package com.carstore.domain

import grails.rest.Resource


//@Resource(uri='/cars', formats=['json', 'xml'])
@Resource(uri='/api/car', formats=['json', 'xml'])
class Car {

	String year
	String make
	String cmodel
	String status

	static hasMany = [partLineItems : PartLineItem]

    static constraints = {
    }
}
