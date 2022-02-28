package com.app.wellApp.services

import com.app.wellApp.dto.CreateAccountResponseDto
import com.app.wellApp.entity.Account
import java.util.*

interface MyService {
    fun createAccount(username: String, password: String, email: String): CreateAccountResponseDto
    fun deleteAccountById(id: UUID, username: String, password: String): String
    fun getAccount(username: String, password: String): Account
    fun saveData(dataName: String, data: String, username: String, password: String): String
    fun deleteDataById(dataId: UUID, username: String, password: String): String
    fun editUsername(id: UUID, currentUsername: String, password: String, newUsername: String): String
    fun editPassword(id: UUID, username: String, currentPassword: String, newPassword: String): String
    fun editEmail(id: UUID, email: String, username: String, password: String): String
    fun changeData(dataId: UUID, newData: String, username: String, password: String): String
    fun getDataById(dataId: UUID, username: String, password: String): String
    fun checkLogin(username: String, password: String): Boolean
}