import grails.converters.JSON

import com.carstore.domain.*

class BootStrap {

    def init = { servletContext ->


    	JSON.registerObjectMarshaller(PartLineItem) {

    		def map=[:]
    		map.id = it.id

            

            map.partId = it.part.id
            map.carId = it.car.id
    		map.quantity = it.quantity

            map.part = it.part
            map.car = [id : it.car.id]


    		return map

    	}

/*
        JSON.registerObjectMarshaller(Car) {

            def map=[
                id : it.id,
                year : it.year,
                make : it.make,
                cmodel : it.cmodel,

            ]

            def pliList = []

            it.partLineItems.each { pli ->

                pliList << [
                    id : pli.id,
                    partId : pli.part.id,
                    carId : pli.car.id,
                    quantity : pli.quantity
                ]

            }

            map.partLineItems = pliList

            return map

        }
*/

    }
    def destroy = {
    }
}
