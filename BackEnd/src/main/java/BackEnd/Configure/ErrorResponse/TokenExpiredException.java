package BackEnd.Configure.ErrorResponse;


public class TokenExpiredException extends Exception{

    public TokenExpiredException(String error){
        super(error);
    }
}