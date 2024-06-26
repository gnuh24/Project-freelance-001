package BackEnd.Entity.Other;


import lombok.Data;

@Data
// Lớp ApiResponse chứa thông tin phản hồi
public class ApiResponse<T> {
    private T data;
    private String httpMethod;
    private String requestUri;
    private int httpStatus;

    public ApiResponse(T data, String httpMethod, String requestUri, int httpStatus) {
        this.data = data;
        this.httpMethod = httpMethod;
        this.requestUri = requestUri;
        this.httpStatus = httpStatus;
    }

}
