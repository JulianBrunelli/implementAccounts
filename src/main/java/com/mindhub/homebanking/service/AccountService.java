package com.mindhub.homebanking.service;

import com.mindhub.homebanking.dtos.AccountDTO;
import com.mindhub.homebanking.models.Account;

import java.util.List;

public interface AccountService {
    void saveAccount(Account account);

    Account findByNumber(String number);

    List<AccountDTO> getAccountsDTO();

}
