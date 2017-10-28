package edu.sjsu.cmpe275.aop.aspect;

import org.springframework.beans.factory.annotation.Autowired;  // if needed

import edu.sjsu.cmpe275.aop.ProfileService;

import org.aspectj.lang.annotation.Aspect;  // if needed

import java.util.*;
import edu.sjsu.cmpe275.aop.exceptions.AccessDeniedExeption;
import org.aspectj.lang.JoinPoint;  // if needed
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;  // if needed
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Before;  // if needed
import org.aspectj.lang.annotation.Pointcut;


@Aspect
public class AuthorizationAspect {
    /***
     * Following is a dummy implementation of this aspect.
     * You are expected to provide an actual implementation based on the requirements, including adding/removing advises as needed.
     */
	
	private HashMap<String,HashSet<String>> sharedMap = new HashMap<String, HashSet<String>>();

	@Autowired ProfileService profileService;
	
	@Around("unshareProfile()")
	public void unshareProfileAdvice(ProceedingJoinPoint joinPoint) throws Throwable {

		String userId=(String) joinPoint.getArgs()[0];
		String targetUserId=(String) joinPoint.getArgs()[1];
		if(!userId.equals(targetUserId)){
		if( !sharedMap.containsKey(userId)||!sharedMap.get(userId).contains(targetUserId))
			throw new AccessDeniedExeption("Sorry "+userId+" you cannot unshare your profile with "+targetUserId+" as you have not shared your profile with him");
		joinPoint.proceed();
		sharedMap.get(userId).remove(targetUserId);
		if(sharedMap.get(userId).size()<=0)
			sharedMap.remove(userId);
		} else
		{
			joinPoint.proceed();
		}
	}
	
	
	@Before("shareProfile()")
	public void shareProfileAdvice(JoinPoint joinPoint) throws AccessDeniedExeption {
		
		String userId=(String) joinPoint.getArgs()[0];
		String profileUserId=(String) joinPoint.getArgs()[1];
		String targetUserId=(String) joinPoint.getArgs()[2];
		//user Sharing his/her profile
		if(userId.equalsIgnoreCase(profileUserId))
		{   //user profile is already added
			if(sharedMap.containsKey(profileUserId))
			{
				sharedMap.get(profileUserId).add(targetUserId);
			}else // create a new user profile
			{
			HashSet<String> sharedTargets = new HashSet<String>();
			sharedTargets.add(targetUserId);
			sharedMap.put(userId,sharedTargets);
			}
		}else //user sharing a different profile than his
		{	//user is authorized to share other person profile
			if(sharedMap.containsKey(profileUserId) && sharedMap.get(profileUserId).contains(userId))
			{
				HashSet<String> add=sharedMap.get(profileUserId);
				add.add(targetUserId);
			}else // user is not authorized to throw other person profile throw error
				throw new AccessDeniedExeption("Sorry "+userId+" you are not authorized to share "+profileUserId+" profile");	
		}		
	}

	@After("readProfile()")
	public void readProfileAdvice(JoinPoint joinPoint) throws AccessDeniedExeption {

		String userId=(String) joinPoint.getArgs()[0];
		String targetUserId=(String) joinPoint.getArgs()[1];
		
		if(!userId.equals(targetUserId)&&(!sharedMap.containsKey(targetUserId)||!sharedMap.get(targetUserId).contains(userId)))
			{throw new AccessDeniedExeption("Sorry "+userId+" you cannot read "+targetUserId+" profile as you are not authorized");
		}else
		{
			System.out.println(userId+" have read "+targetUserId+" profile");
		}
		
	}
	 @Pointcut("execution(public void edu.sjsu.cmpe275.aop.ProfileService.shareProfile(..))")
	 public void shareProfile(){};
	 
	 @Pointcut("execution(public void edu.sjsu.cmpe275.aop.ProfileService.unshareProfile(..))")
	 public void unshareProfile(){};
	 
	 @Pointcut("execution( * edu.sjsu.cmpe275.aop.ProfileService.readProfile(..))")
	 public void readProfile(){};
	
}
