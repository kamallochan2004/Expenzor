package com.expenzor.application.Service;

import com.expenzor.application.Repository.AppRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppService {
    @Autowired
    private AppRepo appRepo;

}
