CREATE TABLE "user" 
(
    "user_id" INT NOT NULL,         -- ID del usuario.
    "name" VARCHAR NOT NULL,        -- Nombre.
    "lastname" VARCHAR,             -- Apellido.
    "photoUrl" VARCHAR,             -- Foto del usuario.
    "email" VARCHAR NOT NULL,       -- Correo.
    "gender" VARCHAR,               -- Genero.
    "date" DATE NOT NULL,           -- Fecha.
    "time" TIME NOT NULL            -- Hora.
    -- "password" VARCHAR NOT NULL,    -- Contrasena
    -- "displayName" VARCHAR,          -- Nombre completo.
    -- "username" VARCHAR,          -- Nombre de usuario.
    -- "datebirth" DATE,            -- Fecha de nacimiento.
    -- "age" INT,                   -- Edad
);
go;
CREATE TABLE "post" 
(
    "post_id" INT NOT NULL,         -- ID del post
    "text" VARCHAR,                 -- Texto del post.
    "imageUrl" VARCHAR,             -- Imagen del post.
    "user_id" INT NOT NULL,         -- ID del usuario.
    "date" DATE NOT NULL,           -- Fecha.
    "time" TIME NOT NULL,           -- Hora.
);
go;
CREATE TABLE "chat"
(
    "message_id" INT NOT NULL,      -- ID del mensaje.
    "message" TEXT NOT NULL,        -- Mensaje
    "user_id" INT NOT NULL,         -- ID del usuario.
    "date" DATE NOT NULL,           -- Fecha.
    "time" TIME NOT NULL            -- Hora.
);
go;
CREATE TABLE "post_comment"
(
    "comment_id" INT NOT NULL,      -- ID del comentario.
    "comment" TEXT,                 -- Comentario.
    "post_id" INT NOT NULL,         -- ID del post.
    "user_id" INT NOT NULL,         -- ID del usuario.
    "imageUrl" VARCHAR,             -- Imagen del comentario.
    "date" DATE NOT NULL,           -- Fecha.
    "time" TIME NOT NULL            -- Hora.
);
go;
CREATE TABLE "post_likes"
(
    -- "like_id" INT NOT NULL,
    "user_id" INT NOT NULL,
    "post_id" INT NOT NULL,
    "date" DATE NOT NULL,           -- Fecha.
    "time" TIME NOT NULL            -- Hora.
);
---------------------------------------------------------------------------------
go;
CREATE TABLE "friends"
(
    "sender_user_id" INT NOT NULL,
    "receiver_user_id" INT NOT NULL,
    "date" DATE NOT NULL,           -- Fecha.
    "time" TIME NOT NULL            -- Hora.
);
go;                                         -- POR DECIDIR.
CREATE TABLE "be_my_friend"
(
    "sender_user_id" INT NOT NULL,
    "receiver_user_id" INT NOT NULL,
    "date" DATE NOT NULL,           -- Fecha.
    "time" TIME NOT NULL            -- Hora.
);
go;
---------------------------------------------------------------------------------

ALTER TABLE "user" ADD CONSTRAINT "PK_USER" PRIMARY KEY("user_id");
ALTER TABLE "post" ADD CONSTRAINT "PK_POST" PRIMARY KEY("post_id");
ALTER TABLE "chat" ADD CONSTRAINT "PK_CHAT" PRIMARY KEY("message_id");
ALTER TABLE "post_comment" ADD CONSTRAINT "PK_POST_COMMENT" PRIMARY KEY("comment_id");

ALTER TABLE "user" ADD CONSTRAINT "UK_USER_EMAIL" UNIQUE("email");
ALTER TABLE "post_likes" ADD CONSTRAINT "UK_POST_LIKE" UNIQUE("user_id", "post_id");

ALTER TABLE "post" ADD CONSTRAINT "FK_POST_USER_ID" FOREIGN KEY("user_id") REFERENCES "user"("user_id");
ALTER TABLE "chat" ADD CONSTRAINT "FK_CHAT_USER_ID" FOREIGN KEY("user_id") REFERENCES "user"("user_id");
ALTER TABLE "post_comment" ADD CONSTRAINT "FK_POST_COMMENT_USER_ID" FOREIGN KEY("user_id") REFERENCES "user"("user_id");
ALTER TABLE "post_comment" ADD CONSTRAINT "FK_POST_COMMENT_POST_ID" FOREIGN KEY("user_id") REFERENCES "user"("user_id");
ALTER TABLE "post_likes" ADD CONSTRAINT "FK_POST_LIKES_USER_ID" FOREIGN KEY("user_id") REFERENCES "user"("user_id");
ALTER TABLE "post_likes" ADD CONSTRAINT "FK_POST_LIKES_POST_ID" FOREIGN KEY("post_id") REFERENCES "post"("post_id");

-- CREATE UNIQUE INDEX "IDX_" ON TABLA(VALUE)

-- DROP TABLE "friends";
-- DROP TABLE "be_my_friend";
-- DROP TABLE "chat";
-- DROP TABLE "post_comment";
-- DROP TABLE "post_likes";
-- DROP TABLE "post";
-- DROP TABLE "user";