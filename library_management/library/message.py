class res:

    def message_display(res_code):
        message_code = {
            "1": "Success",
            "2": "Server error",
            "3": "Entered email is not valid",
            "4": "Login credentials is not valid",
            "5": "Input Json is not valid",
            "6":  "Book has been deleted successfully",
            "7": "Data not found",
            "8": "Book has been update successfully"

        }
        if res_code:
            return message_code[str(res_code)]
        else:
            return message_code['3']

    def response_json(status, res_message, result=False):
        if status == 200:
            if result:
                return {'res_code': status, 'message': res.message_display(res_message), 'result': result}
            else:
                return {'res_code': status, 'message': res.message_display(res_message)}
        elif status == 202:
            return {'res_code': status, 'message': res.message_display(res_message), 'result': result}
        else:
            return {'res_code': status, 'message': res.message_display(res_message)}