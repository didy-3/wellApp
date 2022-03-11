package com.app.wellApp.repository

import com.app.wellApp.entity.Data
import org.springframework.data.repository.PagingAndSortingRepository
import java.util.*


interface DataRepository : PagingAndSortingRepository<Data, UUID>{

}