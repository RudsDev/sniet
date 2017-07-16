package br.com.persist.api;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;


public class JPAUtil {
	
	private static EntityManagerFactory emf;
	private static final ThreadLocal<EntityManager> threadEntityManager = new ThreadLocal<EntityManager>();
	private static final ThreadLocal<EntityTransaction> threadTransaction = new ThreadLocal<EntityTransaction>();

	static 
	{	try	{
		emf = Persistence.createEntityManagerFactory("teste");
		}
		catch(Throwable e){
			System.out.println(">>>>>>>>>>>>>>>> " + e.getMessage());
		}
	}

	public static void beginTransaction() {
		
		//System.out.println("Vai criar transacao");

		EntityTransaction tx = threadTransaction.get();
		try {
			
			if (tx == null) {
				tx = getEntityManager().getTransaction();
				tx.begin();
				threadTransaction.set(tx);
				//System.out.println("Criou transacao");
			}
			else{
				//System.out.println("Nao criou transacao");
			}
		} 
		catch (RuntimeException ex) {	
			//TODO Criar exception apropriada
		}
	}

	public static EntityManager getEntityManager() {
		
		// System.out.println("Abriu ou recuperou sessão");
	
		EntityManager em = threadEntityManager.get();
		
		// Abre uma nova Sessão, se a thread ainda não possui uma.
		try {
			if (em == null) {
				em = emf.createEntityManager();
				threadEntityManager.set(em);
				//System.out.println("criou sessao");
			}
		} 
		catch (RuntimeException ex) {
			////TODO Criar exception apropriada
		}
		return em;
	}

	public static void commitTransaction() {
		
		EntityTransaction tx = threadTransaction.get();
		
		try {
			if ( tx != null && tx.isActive()){
				tx.commit();
				//System.out.println("Comitou transacao");
			}
			threadTransaction.set(null);
		} 
		catch (RuntimeException ex) {
			
			try {
				rollbackTransaction();
			}
			catch(RuntimeException e){
				////TODO Criar exception apropriada}
			}
		}
	}

	public static void rollbackTransaction() {
		
		System.out.println("Vai efetuar rollback de transacao");
	
		EntityTransaction tx = threadTransaction.get();
		
		try {
			threadTransaction.set(null);
			if ( tx != null && tx.isActive()) {
				tx.rollback();
			}
		} 
		catch (RuntimeException ex) {
			////TODO Criar exception apropriada
		} 
		finally {
			closeEntityManager();
		}
	}

	public static void closeEntityManager() {
		
		//System.out.println("Vai fechar sessão");

		try {
			EntityManager em = threadEntityManager.get();
			threadEntityManager.set(null);
			
			if (em != null && em.isOpen()){
				em.close();
				//System.out.println("Fechou a sessão");
			}

			EntityTransaction tx = threadTransaction.get();
			
			if ( tx != null && tx.isActive()){
				rollbackTransaction();
				throw new RuntimeException("EntityManager sendo fechado " +
						                   "com transação ativa.");
			}
		} 	
		catch (RuntimeException ex) {
			////TODO Criar exception apropriada
		}
	}
}