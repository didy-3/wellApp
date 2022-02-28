package com.app.wellApp.services

import com.app.wellApp.dto.CreateAccountResponseDto
import com.app.wellApp.entity.Account
import com.app.wellApp.entity.Data
import com.app.wellApp.repository.AccountRepository
import com.app.wellApp.repository.DataRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*


@Service
class MyServiceImpl @Autowired constructor(
    var accountRepository: AccountRepository,
    var dataRepository: DataRepository
) : MyService {
    override fun checkLogin(username: String, password: String): Boolean {
        var acc = accountRepository.findByUsername(username)
        return acc.get().password == password
    }

    override fun changeData(dataId: UUID, newData: String, username: String, password: String): String {
        if (checkLogin(username, password)) {
            var data = dataRepository.findById(dataId).get()
            var newDataDecoded = Base64.getDecoder().decode(newData);
            data.data = String(newDataDecoded)
            dataRepository.save(data)
            var dataName = dataRepository.findById(dataId).get().dataName

            return "Data $dataName changed"
        }
        throw Exception("Wrong username or password.")
    }

    override fun createAccount(username: String, password: String, email: String): CreateAccountResponseDto {
        var result = CreateAccountResponseDto()
        try {
            if (accountRepository.existsByUsername(username)) {
                throw Exception("Account with username '$username' exists.")
            }
            if (accountRepository.existsByEmail(email)) {
                throw Exception("Account with email '$email' exists.")
            }
            var account = Account().apply {
                this.username = username
                this.password = password
                this.email = email
            }
            accountRepository.save(account)
            result
        } catch (e: Exception) {
            result.error=e.message
        }
        return result
    }

    override fun deleteAccountById(id: UUID, username: String, password: String): String {
        if (checkLogin(username, password)) {
            accountRepository.deleteById(id)
            return "Account successfully deleted."
        }
        throw Exception("Wrong username or password.")
    }

    override fun getAccount(username: String, password: String): Account {
        if (checkLogin(username, password)) {
            var acc = accountRepository.findByUsername(username).get()
            return acc
        }
        throw Exception("Wrong username or password.")
    }

    override fun saveData(dataName: String, data: String, username: String, password: String): String {
        if (checkLogin(username, password)) {
            var newData = Data().apply {
                var dataDecoded = Base64.getDecoder().decode(data);
                this.data = String(dataDecoded)
                this.dataName = dataName
            }
            dataRepository.save(newData)
            var acc = accountRepository.findByUsername(username).get()
            acc.dataIds.add(newData.dataId)
            accountRepository.save(acc)

            return newData.dataId.toString()
        }
        throw Exception("Wrong username or password.")
    }

    override fun deleteDataById(dataId: UUID, username: String, password: String): String {
        if (checkLogin(username, password)) {
            var acc = accountRepository.findByUsername(username).get()
            acc.dataIds.remove(dataId)
            accountRepository.save(acc)
            var dataName = dataRepository.findById(dataId).get().dataName
            dataRepository.deleteById(dataId)

            return "Data $dataName deleted"
        }
        throw Exception("Wrong username or password.")
    }

    override fun editUsername(id: UUID, currentUsername: String, password: String, newUsername: String): String {
        if (checkLogin(currentUsername, password)) {
            var acc = accountRepository.findById(id)
            acc.get().username = newUsername
            accountRepository.save(acc.get())
            return "Username changed."
        }
        throw Exception("Wrong username or password.")
    }

    override fun editPassword(id: UUID, username: String, currentPassword: String, newPassword: String): String {
        if (checkLogin(username, currentPassword)) {
            var acc = accountRepository.findById(id)
            acc.get().password = newPassword
            accountRepository.save(acc.get())
            return "Password changed."
        }
        throw Exception("Wrong username or password.")
    }

    override fun editEmail(id: UUID, email: String, username: String, password: String): String {
        if (checkLogin(username, password)) {
            var acc = accountRepository.findById(id).get()
            acc.email = email
            accountRepository.save(acc)
            return "Email changed."
        }
        throw Exception("Wrong username or password.")
    }

    override fun getDataById(dataId: UUID, username: String, password: String): String {
        if (checkLogin(username, password)) {
            var data = dataRepository.findById(dataId).get()
            return data.data
        }
        throw Exception("Wrong username or password.")
    }
}