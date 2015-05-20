package com.carstore.domain

import grails.rest.Resource

//@Resource(uri='/parts', formats=['json', 'xml'])
@Resource(uri='/api/part', formats=['json', 'xml'])
class Part {

	String brand
	String pmodel
	String name

    static constraints = {
    }
}
