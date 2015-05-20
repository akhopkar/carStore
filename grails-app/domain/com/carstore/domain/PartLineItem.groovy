package com.carstore.domain

import grails.rest.Resource

//@Resource(uri='/partLineItems', formats=['json', 'xml'])
@Resource(uri='/api/partLineItem', formats=['json', 'xml'])


class PartLineItem {

	static belongsTo = [car : Car]

	Part part
	Integer quantity
 
    static constraints = {

    	
    }
}
