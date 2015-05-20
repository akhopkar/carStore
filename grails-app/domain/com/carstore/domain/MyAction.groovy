package com.carstore.domain

import grails.rest.Resource


@Resource(uri='/api/myAction', formats=['json', 'xml'])
class MyAction {

	static belongsTo = [test : Test]

	String name
	String description

    static constraints = {
    }
}
