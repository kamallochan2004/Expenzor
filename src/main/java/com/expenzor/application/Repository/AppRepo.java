package com.expenzor.application.Repository;

import com.expenzor.application.Entity.App;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppRepo extends JpaRepository<App, Long> {

}
