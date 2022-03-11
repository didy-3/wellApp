package com.app.wellApp.entity

import java.util.*
import javax.persistence.*

@Entity(name = "data")
class Data (){
    @Id
    var dataId: UUID = UUID.randomUUID()
    lateinit var dataName: String

    //must not be 255 length
    @Column(columnDefinition = "varchar")
    lateinit var data: String
}