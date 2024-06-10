import { BadRequestException, ValidationPipe } from '@nestjs/common';

export const validationPipe: ValidationPipe = new ValidationPipe({
  exceptionFactory: (errors) => {
    const validationErrorMessages = errors.map((error) => {
      let messages: string[] = [];
      if (error.children) {
        error.children.forEach((childrenError) => {
          messages = [...messages, ...Object.values(childrenError.constraints)];
        });
      }

      if (error.constraints) {
        messages = [...messages, ...Object.values(error.constraints)];
      }
      return messages;
    });
    let message = null;
    const messagesArray = validationErrorMessages.flat();
    console.log(messagesArray);
    if (messagesArray.length) {
      message = messagesArray[0];
    }
    return new BadRequestException(message);
  },
  stopAtFirstError: false,
});
