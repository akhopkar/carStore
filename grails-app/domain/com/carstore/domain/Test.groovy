package com.carstore.domain

import grails.rest.Resource


@Resource(uri='/api/test', formats=['json', 'xml'])
class Test {

	static hasMany = [myActions : MyAction]

	Integer intVal
	String stringVal
	Boolean booleanVal

    static constraints = {
    }
}
