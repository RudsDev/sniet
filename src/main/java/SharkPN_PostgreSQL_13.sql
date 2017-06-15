/*

    Daniel Silos fez alterações em Espécie, alterando o nome do atributo foto para FotoPadrao
    e criou nova tabela chamada Midia que será utilizada para a localização (endereço físico) de fotos e vídeos
    Removeu os "_" (underlines) dos nomes das tabelas definindo seu não uso como padrão

    Data:25/03/2016
    Hora: 11:36


	Alexandre fez algumas alterações em LOCALIDADE.

	Inseriu a linha após CREATE TABLE: SELECT addgeometrycolumn('public','localidade','geom',4326,'POINT',2,FALSE)

	Alterou os atributos:
		Latitude DOUBLE PRECISION,
		Longitude DOUBLE PRECISION,

	Para incluir dados em LOCALIDADE, deve-se seguir o seguinte formato:

		INSERT INTO LOCALIDADE (IDLocalidade, Latitude, Longitude, Status_Localidade, GEOM)
						VALUES (IDLocalidade, Latitude,	Longitude, Status_Localidade, ST_GeomFromText('POINT(Longitude  Latitude)', 4326));
						
						
						
						
	------------------------------------------------------------------------------------------------------------------------------------------

	Rafael Dias realizou as seguintes alterações:
	
	 - Tabela LOCAL:
		> Retirado relacionamento com a tabela País.
			Diminuindo escopo do projeto. Não foi possível criar um banco populado a tempo.
		> O campo Paíz agora é um varchar.
		> Adcionado o campo Bairro.
		
		
	 - Tabela Usuario:
		> Adcionado o campo Status.
		> Adcionado o campo Sexo.

		

    Data:11/06/2017
    Hora: 11:36
						
						
*/

/*
DROP TABLE USUARIO;
DROP TABLE INSTITUICAO;
DROP TABLE ATENDIMENTO;
DROP TABLE ATAQUE;
DROP TABLE INDIVIDUO;
DROP TABLE PRATICA;
DROP TABLE FONTE;
DROP TABLE LOCAL;
DROP TABLE INCIDENTE;
DROP TABLE TUBARAO;
DROP TABLE NOME;
DROP TABLE PAIS;
DROP TABLE ESPECIE;
DROP TABLE VENTRE;
DROP TABLE DENTICAO;
DROP TABLE HABITAT;
DROP TABLE REPRODUCAO;
DROP TABLE FOCINHO;
DROP TABLE FAMILIA;
DROP TABLE FENDASBRANQUIAIS;
DROP TABLE ORDEM;
DROP TABLE BARBPEITORAL;
DROP TABLE BARBANAL;
DROP TABLE BARBCAUDAL;
DROP TABLE BARBDORSAL;
DROP TABLE DORSO;
DROP TABLE BARBATANA;
*/

/*
CREATE DATABASE SHARK
  WITH OWNER = postgres
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'Portuguese_Brazil.1252'
       LC_CTYPE = 'Portuguese_Brazil.1252'
       CONNECTION LIMIT = -1;

*/
--1 Tabela Barbatana Dorsal

CREATE TABLE BarbDorsal (
  CodBarbDorsal INTEGER Primary Key,
  DescBarbDorsal VARCHAR(50) UNIQUE
);

--2 Tabela Barbatana Caudal

CREATE TABLE BarbCaudal (
  CodBarbCaudal INTEGER Primary Key,
  DescBarbCaudal VARCHAR(60) UNIQUE
);

--3 Tabela Barbatana Anal

CREATE TABLE BarbAnal (
  CodBarbAnal INTEGER Primary Key,
  DescBarbAnal VARCHAR(50) UNIQUE
);

--4 Tabela Barbatana Peitoral

CREATE TABLE BarbPeitoral (
  CodBarbPeitoral INTEGER Primary Key,
  DescBarbPeitoral VARCHAR(50) UNIQUE
);

---5  Tabela Ordem

Create table Ordem (
  IDOrdem INTEGER PRIMARY KEY,
  NomeOrdem VARCHAR (20) NOT NULL,
  DescOrdem VARCHAR (500),
  MembranaNictante CHAR,
  CorpoAchatado CHAR(1),
  PosicaoBoca VARCHAR (18),
  CodBarbDorsal INTEGER ,
  CodBarbCaudal INTEGER ,
  CodBarbAnal INTEGER,
  CodBarbPeitoral INTEGER,
  FOREIGN KEY (CodBarbDorsal) REFERENCES BarbDorsal,
  FOREIGN KEY (CodBarbCaudal) REFERENCES BarbCaudal,
  FOREIGN KEY (CodBarbAnal) REFERENCES BarbAnal,
  FOREIGN KEY (CodBarbPeitoral) REFERENCES BarbPeitoral
);

--6 Tabela FendasBranquiais

CREATE TABLE FendasBranquiais (
  IDFendaBranquial INTEGER PRIMARY KEY,
  QTDFendasBranquiais INTEGER NOT NULL,
  PosicaoFendasBranquiais VARCHAR(15),
  DescricaoFendaBranquiais VARCHAR(200)
);


--7 Tabela Familia

CREATE TABLE Familia (
  IDFamilia INTEGER PRIMARY KEY,
  NomeFamilia VARCHAR(50),
  DescFamilia VARCHAR (500),
  IDOrdem INTEGER,
  IDFendaBranquial INTEGER,
  FOREIGN KEY(IDFendaBranquial)  REFERENCES FendasBranquiais,
  FOREIGN KEY(IDOrdem) REFERENCES Ordem
);


--8 Tabela Focinho
CREATE TABLE Focinho(
  CodFocinho INTEGER PRIMARY KEY,
  DescFocinho VARCHAR(200),
  TipoFocinho VARCHAR(30) UNIQUE

);

--9 Tabela Reproducao
CREATE TABLE Reproducao (
  CodReprod INTEGER PRIMARY KEY,
  TipoReprod VARCHAR(20) UNIQUE
);

--10 Tabela Habitat
CREATE TABLE HABITAT (
  CodHabitat INTEGER PRIMARY KEY,
  DescHabitat VARCHAR(50) UNIQUE

);

--11 Tabela Denticao

CREATE TABLE Denticao (
  CodDenticao INTEGER PRIMARY KEY,
  CaracDenticao VARCHAR(30) UNIQUE
);


--12 Tabela Ventre

CREATE TABLE Ventre (
 CodVentre INTEGER PRIMARY KEY,
 DescCorVentre VARCHAR(50) UNIQUE
);


--13 Tabela Dorso

CREATE TABLE Dorso (
  CodDorso INTEGER PRIMARY KEY,
  DescCorDorso VARCHAR(50) UNIQUE
  );

--14 Tabela Barbatana
CREATE TABLE Barbatana (
	CodBarbatana INTEGER PRIMARY KEY,
    DescCorBarbatana VARCHAR (50) UNIQUE
);

--15 Tabela Espécie

CREATE TABLE Especie(
  IDEspecie INTEGER PRIMARY KEY,
  NomeCientifico VARCHAR(50) Not Null,
  Descricao VARCHAR(200),
  FotoPadrao VARCHAR(60),
  TamMenor NUMERIC(5,2),
  TamMaior NUMERIC(5,2),
  TamMedio NUMERIC(5,2),
  TamMedioFilhote NUMERIC(5,2),
  StatusExtincao CHAR(1),
  CodHabitat INTEGER,
  CodReprod INTEGER,
  CodFocinho INTEGER,
  IdFamilia INTEGER,
  CodDorso INTEGER,
  CodVentre INTEGER,
  CodDenticao INTEGER,
  CodBarbatana INTEGER,
  FOREIGN KEY(CodHabitat) REFERENCES Habitat,
  FOREIGN KEY(CodReprod) REFERENCES Reproducao,
  FOREIGN KEY(CodFocinho) REFERENCES Focinho,
  FOREIGN KEY(IdFamilia) REFERENCES Familia,
  FOREIGN KEY(CodDorso) REFERENCES Dorso,
  FOREIGN KEY(CodVentre) REFERENCES Ventre,
  FOREIGN KEY(CodDenticao) REFERENCES Denticao,
  FOREIGN KEY(CodBarbatana) REFERENCES Barbatana
);

-- 16 Tabela Pais

CREATE TABLE Pais (
	IDPais INTEGER PRIMARY KEY,
    NomePais VARCHAR(100) NOT NULL,
    DescPais VARCHAR(500)
);

--17  Tabela Nome

CREATE TABLE Nome (
  IDNome INTEGER PRIMARY KEY,
  NomePopular VARCHAR(30),
  UF CHAR(2),
  IDEspecie INTEGER NOT NULL,
  IDPais INTEGER NOT NULL,
  FOREIGN KEY(IDEspecie) REFERENCES Especie,
  FOREIGN KEY(IDPais) REFERENCES Pais
);

--18  Tabela Tubarão

CREATE TABLE Tubarao(
  IdTubarao INTEGER PRIMARY KEY,
  Comprimento NUMERIC(5,2),
  Sexo CHAR(1),
  IDEspecie INTEGER,
  FOREIGN KEY(IDEspecie) REFERENCES Especie
);


-- SELECT addgeometrycolumn('public','localidade','geom',4326,'POINT',2,FALSE)

-- 19 Tabela Local
CREATE TABLE Local (
	idLocal INTEGER PRIMARY KEY,
    NomeLocal VARCHAR(80) NOT NULL,
    Cidade VARCHAR(80) NOT NULL,
	Bairro VARCHAR(80),
    UF CHAR(2) NOT NULL,
	Pais VARCHAR(80),
    Latitude NUMERIC(12,10),
    Longitude NUMERIC(13,10)
	--IDPais INTEGER,
  --FOREIGN KEY(IDPais) REFERENCES Pais
);


--20  Tabela Incidente

CREATE TABLE Incidente (
  IDIncidente INTEGER PRIMARY KEY,
  DescIncidente VARCHAR(300),
  DataHoraIncidente DATE NOT NULL,
  IDTubarao INTEGER,
  IDLocal INTEGER,
  FOREIGN KEY(IdTubarao) REFERENCES Tubarao,
  FOREIGN KEY(IDLocal) REFERENCES Local
);


--21  Tabela Fonte

CREATE TABLE Fonte (
  IDFonte INTEGER PRIMARY KEY,
  DataPublicacao DATE NOT NULL,
  DescFonte VARCHAR(100) NOT NULL,
  OBSFonte VARCHAR(100),
  TipoFonte CHAR NOT NULL,
  IDIncidente INTEGER,
  FOREIGN KEY(IDIncidente) REFERENCES Incidente
);


--22 Tabela Pratica

CREATE TABLE Pratica (
  IDPratica INTEGER PRIMARY KEY,
  TipoPratica CHAR,
  StatusPratica CHAR,
  DescPratica VARCHAR(100)
);

--23 Tabela Individuo


CREATE TABLE Individuo (
  IDIndividuo INTEGER PRIMARY KEY,
  Idade INTEGER,
  Nome VARCHAR(60),
  Profissao VARCHAR(60),
  Sexo CHAR,
  IDPratica INTEGER,
  IDIncidente INTEGER NOT NULL,
  FOREIGN KEY(IDPratica) REFERENCES Pratica,
  FOREIGN KEY(IDIncidente) REFERENCES Incidente

);

--24 Tabela Ataque

CREATE TABLE Ataque (
  IDAtaque INTEGER PRIMARY KEY,
  StatusSequela VARCHAR(30),
  StatusTubarao VARCHAR(30),
  OBSAtaque VARCHAR(300),
  StatusFatalidade CHAR,
  LocalCorpo VARCHAR(20),
  IDIncidente INTEGER,
  FOREIGN KEY(IDIncidente) REFERENCES Incidente
);

--25 Tabela Atendimento

CREATE TABLE Atendimento (
  IDAtendimento INTEGER PRIMARY KEY,
  Encaminhamento VARCHAR (50),
  OBSAtendimento VARCHAR(200),
  TempoRecuperacao NUMERIC(3),
  StatusAtendimento CHAR,
--  IDIncidente INTEGER,
  IDIndividuo INTEGER,
--  FOREIGN KEY(IDIncidente) REFERENCES Incidente,
  FOREIGN KEY(IDIndividuo) REFERENCES Individuo
);



-- 26 Tabela Instituicao
CREATE TABLE Instituicao (
	IDInst INTEGER PRIMARY KEY,
    NomeInstituicao VARCHAR(50) NOT NULL,
    Registro VARCHAR(20),
    TipoInst CHAR(2)
    CONSTRAINT CK_TipoInst CHECK(TipoInst IN('CP','UN','OF', 'OU'))
    -- CP - Centro de Pesquisa
    -- UN - Universidade
    -- OF - Órgão Fiscalizador
    -- OU - Outros
);


-- 27 Tabela Usuario
CREATE TABLE Usuario(
	IDUsuario INTEGER PRIMARY KEY,
	Sexo CHAR(1) NOT NULL,
	Status CHAR(1) NOT NULL,
	Login VARCHAR(100) NOT NULL,
	Senha VARCHAR(20) NOT NULL,
	NivelAcesso NUMERIC(1) NOT NULL,
	Nome VARCHAR(60) NOT NULL,
	Sobrenome VARCHAR(60) NOT NULL,
	Email VARCHAR(60) NOT NULL,
	Telefone VARCHAR(20) NOT NULL,
	IDInst INTEGER,
    IDUsuarioAdm INTEGER,
    FOREIGN KEY(IDInst) REFERENCES Instituicao,
    FOREIGN KEY(IDUsuarioAdm) REFERENCES Usuario(IDUsuario)
);

