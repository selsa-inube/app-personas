const regex = {
  onlyLetters: /^[a-zA-ZÁ-Úá-úÑñ\s]*$/,
  emailFormat:
    /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,63}$/i,
  onlyNumbers: /^[0-9]*$/,
  passwordFormat:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=_¡¿!?.])([a-zA-Z\d@#$%^&+=_¡¿!?.]){8,}$/,
  date: /^(0[1-9]|[12][0-9]|3[01])\/(Ene|Feb|Mar|Abr|May|Jun|Jul|Ago|Sep|Oct|Nov|Dic)\/\d{4}$/,
  
};

export { regex };
