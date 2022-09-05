import CreateAccountController from '../../../../application/controllers/account/createAccountController';
import AccountRepositoryMemory from '../../../../infra/repository/accountRepositoryMemory';
import CreateAccountUseCase from '../../../../application/useCases/account/createAccountUseCase';

export const createAccountControllerFactory = () => {
  /*const jwtAdapter = jwtTokenAdapterSingleton;
  const refreshTokenUseCase = new RefreshToken(
    createTokenRepository,
    findByTokenRepository,
    jwtAdapter,
  );
  const createdPresenter = new GenericCreatedResponse<SignInResponseModel>();
  const refreshTokenController = new RefreshTokenController(
    refreshTokenUseCase,
    createdPresenter,
  );
 */
  const createAccountUseCase = new CreateAccountUseCase(new InMemoryAccountRepositoryMemory())
  const createAccountController = new CreateAccountController(createAccountUseCase)
  
  return {
    createAccountController,
  }
};