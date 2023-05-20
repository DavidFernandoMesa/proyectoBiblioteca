import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1684529177474 implements MigrationInterface {
    name = 'Init1684529177474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bibliotecas" ("id" SERIAL NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_e364f07b5b144f1501fabf88f84" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "personas" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "edad" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "biblioteca_id" integer, CONSTRAINT "PK_714aa5d028f8f3e6645e971cecd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reservas" ("id" SERIAL NOT NULL, "fecha_prestamo" date NOT NULL, "fecha_devolucion" date NOT NULL, "reservado" boolean NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "persona_id" integer, CONSTRAINT "PK_309c659053bcf5e56f8e40a2b42" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "libros" ("id" SERIAL NOT NULL, "titulo" character varying NOT NULL, "genero" character varying NOT NULL, "sinopsis" text NOT NULL, "idioma" character varying NOT NULL, "formato" character varying NOT NULL, "anio_publicacion" date NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "autor_id" integer, "reserva_id" integer, "biblioteca_id" integer, CONSTRAINT "UQ_d5358d9ce4561d49b264045a9f0" UNIQUE ("titulo"), CONSTRAINT "PK_63bdc208aaf1ed7e4df6dba27a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "autores" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "edad" character varying NOT NULL, "nacionalidad" character varying NOT NULL, "genero" character varying NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_8973029e8bb26f72a4738afc834" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "personas" ADD CONSTRAINT "FK_0ba1f9a516ac8e60092d10a89ad" FOREIGN KEY ("biblioteca_id") REFERENCES "bibliotecas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservas" ADD CONSTRAINT "FK_6ca794e73643f7737aa0a72ff57" FOREIGN KEY ("persona_id") REFERENCES "personas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "libros" ADD CONSTRAINT "FK_34c5283adbdc24780128e04d7d9" FOREIGN KEY ("autor_id") REFERENCES "autores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "libros" ADD CONSTRAINT "FK_85597e0a3a9112d88bb70908480" FOREIGN KEY ("reserva_id") REFERENCES "reservas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "libros" ADD CONSTRAINT "FK_3d6633db14ebf769754741a57bc" FOREIGN KEY ("biblioteca_id") REFERENCES "bibliotecas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "libros" DROP CONSTRAINT "FK_3d6633db14ebf769754741a57bc"`);
        await queryRunner.query(`ALTER TABLE "libros" DROP CONSTRAINT "FK_85597e0a3a9112d88bb70908480"`);
        await queryRunner.query(`ALTER TABLE "libros" DROP CONSTRAINT "FK_34c5283adbdc24780128e04d7d9"`);
        await queryRunner.query(`ALTER TABLE "reservas" DROP CONSTRAINT "FK_6ca794e73643f7737aa0a72ff57"`);
        await queryRunner.query(`ALTER TABLE "personas" DROP CONSTRAINT "FK_0ba1f9a516ac8e60092d10a89ad"`);
        await queryRunner.query(`DROP TABLE "autores"`);
        await queryRunner.query(`DROP TABLE "libros"`);
        await queryRunner.query(`DROP TABLE "reservas"`);
        await queryRunner.query(`DROP TABLE "personas"`);
        await queryRunner.query(`DROP TABLE "bibliotecas"`);
    }

}
