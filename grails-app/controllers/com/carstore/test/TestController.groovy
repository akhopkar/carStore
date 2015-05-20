package com.carstore.test

import com.carstore.domain.*

class TestController {

    def index() {

    	Part part = new Part(brand : 'MRF', model: 'MRFDURA123', name : 'MRF Dura 123 Tire')
    	part.save()

    	Car car = new Car(year: '2012', make: 'TOYOTA', model: 'CAMRY')
    	car.save()
    	PartLineItem pli = new PartLineItem(car : car, quantity : 5, part : part)
    	pli.save()

    	render '<h1>SUCCESSFUL</h1>'

    }
}
