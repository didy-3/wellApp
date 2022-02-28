package com.app.wellApp.dto

import java.util.*

class EditUsernameRequestDto {
    lateinit var id: UUID
    lateinit var currentUsername: String
    lateinit var password: String
    lateinit var newUsername: String
}