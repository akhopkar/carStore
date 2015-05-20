package com.carstore.controller

import grails.rest.RestfulController
import com.carstore.domain.PartLineItem

class PartLineItemController extends RestfulController<PartLineItem>  {

    static responseFormats = ['json', 'xml']

    PartLineItemController() {
        super(PartLineItem)
    }

    @Override
    def index() {

    	println 'HELLO THERE FROM PART LINE ITEMS INDEX'

        def carId = params.carId

        if(carId) {

            respond PartLineItem.where {
                car.id == carId
            }.list()


        } else {

            respond PartLineItem.list()


        }
    }
}
