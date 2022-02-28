package com.app.wellApp.dto

import java.util.*

class EditPasswordRequestDto {
    lateinit var id: UUID
    lateinit var username: String
    lateinit var currentPassword: String
    lateinit var newPassword: String

}