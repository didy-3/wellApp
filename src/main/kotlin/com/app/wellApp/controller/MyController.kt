package com.app.wellApp.controller

import com.app.wellApp.dto.*
import com.app.wellApp.entity.Account
import com.app.wellApp.services.MyService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import org.springframework.web.bind.annotation.CrossOrigin;


@Controller
class MyController @Autowired constructor(val myService: MyService) {

    @PostMapping("/login")
    @ResponseBody
    fun checkLogin(@RequestBody dto: CheckLoginDto): Boolean {
        return myService.checkLogin(dto.username, dto.password)
    }

    @PostMapping("/getAccount")
    @ResponseBody
    fun getAccount(@RequestBody dto: GetAccountDto): Account {
        return myService.getAccount(dto.username, dto.password)
    }

    @PostMapping("/getDataById")
    @ResponseBody
    fun getDataById(@RequestBody dto: GetDataByIdDto): String {
        return myService.getDataById(dto.dataId, dto.username, dto.password)
    }

    @PostMapping("/createAccount")
    @ResponseBody
    fun createAccount(@RequestBody dto: CreateAccountRequestDto): CreateAccountResponseDto {
        return myService.createAccount(dto.username, dto.password, dto.email)
    }

    @PostMapping("/deleteAccountById")
    @ResponseBody
    fun deleteAccountById(@RequestBody dto: DeleteAccountRequestDto): String {
        return myService.deleteAccountById(dto.id, dto.username, dto.password)
    }

    @PostMapping("/saveData")
    @ResponseBody
    fun saveData(@RequestBody dto: SaveDataRequestDto): String {
        return myService.saveData(dto.dataName, dto.data, dto.username, dto.password)
    }

    @PostMapping("/changeData")
    @ResponseBody
    fun changeData(@RequestBody dto: ChangeDataDto): String {
        return myService.changeData(dto.dataId, dto.newData, dto.username, dto.password)
    }

    @PostMapping("/deleteDataById")
    @ResponseBody
    fun deleteDataById(@RequestBody dto: DeleteDataRequestDto): String {
        return myService.deleteDataById(dto.dataId, dto.username, dto.password)
    }

    @PostMapping("/editUsername")
    @ResponseBody
    fun editUsername(@RequestBody dto: EditUsernameRequestDto): String {
        return myService.editUsername(dto.id, dto.currentUsername, dto.password, dto.newUsername)
    }

    @PostMapping("/editPassword")
    @ResponseBody
    fun editPassword(@RequestBody dto: EditPasswordRequestDto): String {
        return myService.editPassword(dto.id, dto.username, dto.currentPassword, dto.newPassword)
    }

    @PostMapping("/editEmail")
    @ResponseBody
    fun editEmail(@RequestBody dto: EditEmailRequestDto): String {
        return myService.editEmail(dto.id, dto.email, dto.username, dto.password)
    }

}