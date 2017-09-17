package br.com.api.init;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import br.com.api.persist.JPAUtil;

@WebListener
public class LoadDataServlet implements ServletContextListener {

	public void contextInitialized(ServletContextEvent event){
		
		System.out.println("Criando conexão com DB");
		
		JPAUtil.beginTransaction();
			
	}

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {

	}

}
