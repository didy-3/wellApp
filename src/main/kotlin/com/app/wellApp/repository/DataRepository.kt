package com.app.wellApp.repository

import com.app.wellApp.entity.Account
import com.app.wellApp.entity.Data
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.repository.Repository
import java.util.*


interface DataRepository : PagingAndSortingRepository<Data, UUID>{

}