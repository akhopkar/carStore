package com.carstore.controller

import grails.rest.RestfulController
import com.carstore.domain.Part

class PartController extends RestfulController<Part>  {

    static responseFormats = ['json', 'xml']

    PartController() {
        super(Part)
    }

    @Override
    def index() {
    	
        respond Part.where {
        
        }.list()
        
    }
}