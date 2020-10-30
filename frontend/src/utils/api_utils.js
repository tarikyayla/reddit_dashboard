const ApiUtils = {
    getHeader: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': this.getCookie('csrftoken')
    },
    getHeaderWithToken : (token) => {
      return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : token
      };
    },
    getCookie: (name) => {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0) ==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        }
}

export default ApiUtils;