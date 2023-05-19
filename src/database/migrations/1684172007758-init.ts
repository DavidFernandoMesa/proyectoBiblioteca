import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1684172007758 implements MigrationInterface {
  name = 'init1684172007758';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "biblioteca" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_3834f5c1574aa906b3e00ee87d6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "persona" ("id" SERIAL NOT NULL, "nombre" text NOT NULL, "edad" text NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "bibliotecaId" integer, CONSTRAINT "PK_13aefc75f60510f2be4cd243d71" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reserva_libro" ("id" SERIAL NOT NULL, "fecha_prestamo" date NOT NULL, "fecha_devolucion" date NOT NULL, "reservado" boolean NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "librosId" integer, "personaId" integer, CONSTRAINT "PK_52eee572c136c9fba11a353ae04" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "libro" ("id" SERIAL NOT NULL, "titulo" character varying NOT NULL, "genero" character varying NOT NULL, "sinopsis" text NOT NULL, "idioma" character varying NOT NULL, "formato" character varying NOT NULL, "anio_publicacion" date NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "autorId" integer, "reservaId" integer, "bibliotecaId" integer, CONSTRAINT "UQ_b49ae474be88d4155f2b38bb82f" UNIQUE ("titulo"), CONSTRAINT "PK_47ec60a1186696b36e76f499516" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "autor" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "edad" character varying NOT NULL, "nacionalidad" character varying NOT NULL, "genero" character varying NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_51d3959df48c82010ae1c4907fb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "persona" ADD CONSTRAINT "FK_1d5e4530c1c37b8984d9ff083fd" FOREIGN KEY ("bibliotecaId") REFERENCES "biblioteca"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserva_libro" ADD CONSTRAINT "FK_1c926a4e1e311b9b8ce95f53463" FOREIGN KEY ("librosId") REFERENCES "libro"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserva_libro" ADD CONSTRAINT "FK_9af02187cd426a4196cece2ef17" FOREIGN KEY ("personaId") REFERENCES "persona"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "libro" ADD CONSTRAINT "FK_26d9a35bd3c1c5bbd79d8abcf99" FOREIGN KEY ("autorId") REFERENCES "autor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "libro" ADD CONSTRAINT "FK_deb4967174ef56a1a92c7fd73ce" FOREIGN KEY ("reservaId") REFERENCES "reserva_libro"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "libro" ADD CONSTRAINT "FK_88d3eb2b91376623a70d321f64c" FOREIGN KEY ("bibliotecaId") REFERENCES "biblioteca"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "libro" DROP CONSTRAINT "FK_88d3eb2b91376623a70d321f64c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "libro" DROP CONSTRAINT "FK_deb4967174ef56a1a92c7fd73ce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "libro" DROP CONSTRAINT "FK_26d9a35bd3c1c5bbd79d8abcf99"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserva_libro" DROP CONSTRAINT "FK_9af02187cd426a4196cece2ef17"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserva_libro" DROP CONSTRAINT "FK_1c926a4e1e311b9b8ce95f53463"`,
    );
    await queryRunner.query(
      `ALTER TABLE "persona" DROP CONSTRAINT "FK_1d5e4530c1c37b8984d9ff083fd"`,
    );
    await queryRunner.query(`DROP TABLE "autor"`);
    await queryRunner.query(`DROP TABLE "libro"`);
    await queryRunner.query(`DROP TABLE "reserva_libro"`);
    await queryRunner.query(`DROP TABLE "persona"`);
    await queryRunner.query(`DROP TABLE "biblioteca"`);
  }
}
