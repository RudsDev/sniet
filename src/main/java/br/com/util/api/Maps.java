package br.com.util.api;

import java.io.IOException;
import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.GeocodingApiRequest;
import com.google.maps.errors.ApiException;
import com.google.maps.model.GeocodingResult;
import com.google.maps.model.LatLng;
import br.com.model.api.Incidente;

public class Maps {

	private GeoApiContext context = new GeoApiContext().setApiKey("AIzaSyBL3U0sz0c75omwtSikefpx2AIXLqoQLuk");
	private Incidente incidente = new Incidente();
	private LatLng location;
	private GeocodingApiRequest reverso, direto;
	private String address = "Rua minas gerais rio de janeiro";
	
	public void teste(){

		incidente.setLatitude(-22.820721);//(-22.792438);
		incidente.setLongitude(-43.360028);//(-43.169765);
		location = new LatLng(incidente.getLatitude(), incidente.getLongitude());
		reverso = GeocodingApi.reverseGeocode(context, location);
		direto = GeocodingApi.geocode(context, address);
		try {
			GeocodingResult[] T = reverso.await();
			//Aqui terá na saída o endereço mais próximo em riqueza de detalhes 
			System.out.println("\nEndereço Formatado: "+T[0].formattedAddress);
			System.out.println("\nPlace ID: "+T[0].placeId);
			
			/*Aqui terá na saída todos os endereços que foi recebido.
			for (int i=1; i<T.length;i++){
				System.out.println("\nEndereço Formatado: "+T[i].formattedAddress);
				System.out.println("\nPlace ID: "+T[i].placeId);
			}*/
			//Existem outros atributos dentro do objeto.

		} catch (ApiException | InterruptedException | IOException e) {
			// TODO Auto-generated catch block
		//	e.printStackTrace();
			System.out.println("Deu erro!");
		}
		
		try {
			GeocodingResult[] T = direto.await();
			System.out.println("FormattedAddress: "+T[0].formattedAddress);
			System.out.println("Types: "+T[0].types[0]);
			System.out.println("Geometry: "+T[0].geometry.location.lat);
			System.out.println("Geometry: "+T[0].geometry.location.lng);
			System.out.println("Geometry: "+T[0].geometry.locationType.toUrlValue());
		} catch (ApiException | InterruptedException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}	
}