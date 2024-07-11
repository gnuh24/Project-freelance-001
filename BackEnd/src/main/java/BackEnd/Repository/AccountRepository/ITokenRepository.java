package BackEnd.Repository.AccountRepository;

import BackEnd.Entity.AccountEntity.Token;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITokenRepository extends JpaRepository<Token, Integer> {

    Token findByAccount_Id(Integer id);

    Token findByToken(String token);
}
