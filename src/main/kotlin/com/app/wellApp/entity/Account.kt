package com.app.wellApp.entity

import java.time.Instant
import javax.persistence.*
import com.vladmihalcea.hibernate.type.json.JsonBinaryType
import org.hibernate.annotations.Type
import org.hibernate.annotations.TypeDef

import java.util.*

@TypeDef(
    name = "jsonb",
    typeClass = JsonBinaryType::class
)
@Entity(name = "account")
class Account() {
    @Id
    var userId: UUID = UUID.randomUUID()
    var createdOn: Instant = Instant.now()
    lateinit var username: String
    lateinit var password: String
    lateinit var  email: String
    @Type(type = "jsonb")
    @Column(columnDefinition = "jsonb")
    var dataIds : MutableList<UUID> = mutableListOf()
}