**THIS CHECKLIST IS NOT COMPLETE**. Use `--show-ignored-findings` to show all the results.
Summary
 - [arbitrary-send-eth](#arbitrary-send-eth) (1 results) (High)
 - [reentrancy-eth](#reentrancy-eth) (3 results) (High)
 - [reentrancy-no-eth](#reentrancy-no-eth) (2 results) (Medium)
 - [uninitialized-local](#uninitialized-local) (1 results) (Medium)
 - [unused-return](#unused-return) (17 results) (Medium)
 - [events-access](#events-access) (1 results) (Low)
 - [missing-zero-check](#missing-zero-check) (2 results) (Low)
 - [reentrancy-benign](#reentrancy-benign) (6 results) (Low)
 - [reentrancy-events](#reentrancy-events) (12 results) (Low)
 - [timestamp](#timestamp) (9 results) (Low)
 - [assembly](#assembly) (3 results) (Informational)
 - [dead-code](#dead-code) (34 results) (Informational)
 - [solc-version](#solc-version) (2 results) (Informational)
 - [low-level-calls](#low-level-calls) (4 results) (Informational)
 - [naming-convention](#naming-convention) (3 results) (Informational)
 - [reentrancy-unlimited-gas](#reentrancy-unlimited-gas) (14 results) (Informational)
 - [similar-names](#similar-names) (3 results) (Informational)
 - [unused-state](#unused-state) (1 results) (Informational)
## arbitrary-send-eth
Impact: High
Confidence: Medium
 - [ ] ID-0
[HoldEarn._transferOut(address,address,uint256)](backend/app/Downloads/Smart.sol#L2014-L2022) sends eth to arbitrary user
	Dangerous calls:
	- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)

backend/app/Downloads/Smart.sol#L2014-L2022


## reentrancy-eth
Impact: High
Confidence: Medium
 - [ ] ID-1
Reentrancy in [HoldEarn._getReward(uint256)](backend/app/Downloads/Smart.sol#L1669-L1708):
	External calls:
	- [_transferOut(msg.sender,rewardTokenInfo[pID][tID].rewardToken,sReward)](backend/app/Downloads/Smart.sol#L1681)
		- [returndata = address(token).functionCall(data,SafeERC20: low-level call failed)](backend/app/Downloads/Smart.sol#L791)
		- [IERC20(token).safeTransfer(user,amount)](backend/app/Downloads/Smart.sol#L2017)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
	- [_transferOut(msg.sender,rewardTokenInfo[pID][tID_scope_0].rewardToken,bReward)](backend/app/Downloads/Smart.sol#L1693)
		- [returndata = address(token).functionCall(data,SafeERC20: low-level call failed)](backend/app/Downloads/Smart.sol#L791)
		- [IERC20(token).safeTransfer(user,amount)](backend/app/Downloads/Smart.sol#L2017)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
	External calls sending eth:
	- [_transferOut(msg.sender,rewardTokenInfo[pID][tID].rewardToken,sReward)](backend/app/Downloads/Smart.sol#L1681)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	- [_transferOut(msg.sender,rewardTokenInfo[pID][tID_scope_0].rewardToken,bReward)](backend/app/Downloads/Smart.sol#L1693)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	State variables written after the call(s):
	- [j < rewardID[pID].length()](backend/app/Downloads/Smart.sol#L1687)
	[HoldEarn.userBet](backend/app/Downloads/Smart.sol#L1196) can be used in cross function reentrancies:
	- [HoldEarn._getReward(uint256)](backend/app/Downloads/Smart.sol#L1669-L1708)
	- [HoldEarn.checkClaim(address,uint256)](backend/app/Downloads/Smart.sol#L1574-L1579)
	- [HoldEarn.dealArray(uint256,uint256,address[])](backend/app/Downloads/Smart.sol#L1740-L1766)
	- [HoldEarn.deposit(uint256,uint256)](backend/app/Downloads/Smart.sol#L1456-L1475)
	- [HoldEarn.getUser(uint256,uint256)](backend/app/Downloads/Smart.sol#L1825-L1828)
	- [HoldEarn.getUserBet(address,uint256)](backend/app/Downloads/Smart.sol#L1894-L1896)
	- [HoldEarn.getUserReward(address,uint256,uint256)](backend/app/Downloads/Smart.sol#L1638-L1667)
	- [HoldEarn.withdrawAll(uint256)](backend/app/Downloads/Smart.sol#L1581-L1614)
	- [userBet[msg.sender][pID].bTid.push(tID_scope_0)](backend/app/Downloads/Smart.sol#L1691)
	[HoldEarn.userBet](backend/app/Downloads/Smart.sol#L1196) can be used in cross function reentrancies:
	- [HoldEarn._getReward(uint256)](backend/app/Downloads/Smart.sol#L1669-L1708)
	- [HoldEarn.checkClaim(address,uint256)](backend/app/Downloads/Smart.sol#L1574-L1579)
	- [HoldEarn.dealArray(uint256,uint256,address[])](backend/app/Downloads/Smart.sol#L1740-L1766)
	- [HoldEarn.deposit(uint256,uint256)](backend/app/Downloads/Smart.sol#L1456-L1475)
	- [HoldEarn.getUser(uint256,uint256)](backend/app/Downloads/Smart.sol#L1825-L1828)
	- [HoldEarn.getUserBet(address,uint256)](backend/app/Downloads/Smart.sol#L1894-L1896)
	- [HoldEarn.getUserReward(address,uint256,uint256)](backend/app/Downloads/Smart.sol#L1638-L1667)
	- [HoldEarn.withdrawAll(uint256)](backend/app/Downloads/Smart.sol#L1581-L1614)
	- [userReward[msg.sender][pID][tID_scope_0].claimBase = bReward](backend/app/Downloads/Smart.sol#L1690)
	[HoldEarn.userReward](backend/app/Downloads/Smart.sol#L1184) can be used in cross function reentrancies:
	- [HoldEarn._getReward(uint256)](backend/app/Downloads/Smart.sol#L1669-L1708)
	- [HoldEarn.userReward](backend/app/Downloads/Smart.sol#L1184)

backend/app/Downloads/Smart.sol#L1669-L1708


 - [ ] ID-2
Reentrancy in [HoldEarn.setDefaultToken(uint256,address,uint256)](backend/app/Downloads/Smart.sol#L1392-L1406):
	External calls:
	- [_transferOut(msg.sender,periodInfo[pID].defaultToken,beforeAmount)](backend/app/Downloads/Smart.sol#L1395)
		- [returndata = address(token).functionCall(data,SafeERC20: low-level call failed)](backend/app/Downloads/Smart.sol#L791)
		- [IERC20(token).safeTransfer(user,amount)](backend/app/Downloads/Smart.sol#L2017)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
	- [_transferIn(msg.sender,token,afterAmount)](backend/app/Downloads/Smart.sol#L1398)
		- [returndata = address(token).functionCall(data,SafeERC20: low-level call failed)](backend/app/Downloads/Smart.sol#L791)
		- [IERC20(token).safeTransferFrom(user,address(this),amount)](backend/app/Downloads/Smart.sol#L2026)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
	External calls sending eth:
	- [_transferOut(msg.sender,periodInfo[pID].defaultToken,beforeAmount)](backend/app/Downloads/Smart.sol#L1395)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	- [_transferIn(msg.sender,token,afterAmount)](backend/app/Downloads/Smart.sol#L1398)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
	State variables written after the call(s):
	- [periodInfo[pID].defaultToken = token](backend/app/Downloads/Smart.sol#L1403)
	[HoldEarn.periodInfo](backend/app/Downloads/Smart.sol#L1195) can be used in cross function reentrancies:
	- [HoldEarn._getReward(uint256)](backend/app/Downloads/Smart.sol#L1669-L1708)
	- [HoldEarn._periodPrize(uint256,bool)](backend/app/Downloads/Smart.sol#L1506-L1545)
	- [HoldEarn.addNewPeriod(HoldEarn.PeriodInfo,HoldEarn.RewardTokenInfo[])](backend/app/Downloads/Smart.sol#L1409-L1440)
	- [HoldEarn.check(address,uint256)](backend/app/Downloads/Smart.sol#L1910-L1914)
	- [HoldEarn.checkAdd(address,uint256,HoldEarn.RewardTokenInfo)](backend/app/Downloads/Smart.sol#L1916-L1933)
	- [HoldEarn.checkBase(address,uint256)](backend/app/Downloads/Smart.sol#L1227-L1234)
	- [HoldEarn.checkDefault(address,address,uint256,uint256)](backend/app/Downloads/Smart.sol#L1995-L2012)
	- [HoldEarn.checkDeposit(address,uint256,uint256)](backend/app/Downloads/Smart.sol#L1769-L1781)
	- [HoldEarn.checkSetMinNum(address,uint256,uint256)](backend/app/Downloads/Smart.sol#L1617-L1636)
	- [HoldEarn.checkSetRewardToken(address,address,uint256,uint256,uint256,uint256)](backend/app/Downloads/Smart.sol#L1935-L1958)
	- [HoldEarn.checkWithdraw(address,uint256)](backend/app/Downloads/Smart.sol#L2030-L2051)
	- [HoldEarn.deposit(uint256,uint256)](backend/app/Downloads/Smart.sol#L1456-L1475)
	- [HoldEarn.getPoolInfo(uint256)](backend/app/Downloads/Smart.sol#L1860-L1862)
	- [HoldEarn.getStatus(uint256)](backend/app/Downloads/Smart.sol#L1864-L1892)
	- [HoldEarn.getUserReward(address,uint256,uint256)](backend/app/Downloads/Smart.sol#L1638-L1667)
	- [HoldEarn.notStart(uint256)](backend/app/Downloads/Smart.sol#L1215-L1218)
	- [HoldEarn.setDefaultToken(uint256,address,uint256)](backend/app/Downloads/Smart.sol#L1392-L1406)
	- [HoldEarn.setLockTime(uint256,uint256)](backend/app/Downloads/Smart.sol#L1381-L1390)
	- [HoldEarn.setMinNum(uint256,uint256)](backend/app/Downloads/Smart.sol#L1251-L1254)
	- [HoldEarn.setName(uint256,string)](backend/app/Downloads/Smart.sol#L1220-L1225)
	- [HoldEarn.setPeriodTime(uint256,uint256)](backend/app/Downloads/Smart.sol#L1370-L1379)
	- [HoldEarn.setUserNum(uint256,uint256,uint256)](backend/app/Downloads/Smart.sol#L1257-L1265)
	- [HoldEarn.setUserToken(address,uint256,uint256)](backend/app/Downloads/Smart.sol#L1267-L1274)
	- [HoldEarn.update(uint256)](backend/app/Downloads/Smart.sol#L1477-L1504)
	- [HoldEarn.withdrawAll(uint256)](backend/app/Downloads/Smart.sol#L1581-L1614)
	- [periodInfo[pID].perDefaultAmount = perAmount](backend/app/Downloads/Smart.sol#L1404)
	[HoldEarn.periodInfo](backend/app/Downloads/Smart.sol#L1195) can be used in cross function reentrancies:
	- [HoldEarn._getReward(uint256)](backend/app/Downloads/Smart.sol#L1669-L1708)
	- [HoldEarn._periodPrize(uint256,bool)](backend/app/Downloads/Smart.sol#L1506-L1545)
	- [HoldEarn.addNewPeriod(HoldEarn.PeriodInfo,HoldEarn.RewardTokenInfo[])](backend/app/Downloads/Smart.sol#L1409-L1440)
	- [HoldEarn.check(address,uint256)](backend/app/Downloads/Smart.sol#L1910-L1914)
	- [HoldEarn.checkAdd(address,uint256,HoldEarn.RewardTokenInfo)](backend/app/Downloads/Smart.sol#L1916-L1933)
	- [HoldEarn.checkBase(address,uint256)](backend/app/Downloads/Smart.sol#L1227-L1234)
	- [HoldEarn.checkDefault(address,address,uint256,uint256)](backend/app/Downloads/Smart.sol#L1995-L2012)
	- [HoldEarn.checkDeposit(address,uint256,uint256)](backend/app/Downloads/Smart.sol#L1769-L1781)
	- [HoldEarn.checkSetMinNum(address,uint256,uint256)](backend/app/Downloads/Smart.sol#L1617-L1636)
	- [HoldEarn.checkSetRewardToken(address,address,uint256,uint256,uint256,uint256)](backend/app/Downloads/Smart.sol#L1935-L1958)
	- [HoldEarn.checkWithdraw(address,uint256)](backend/app/Downloads/Smart.sol#L2030-L2051)
	- [HoldEarn.deposit(uint256,uint256)](backend/app/Downloads/Smart.sol#L1456-L1475)
	- [HoldEarn.getPoolInfo(uint256)](backend/app/Downloads/Smart.sol#L1860-L1862)
	- [HoldEarn.getStatus(uint256)](backend/app/Downloads/Smart.sol#L1864-L1892)
	- [HoldEarn.getUserReward(address,uint256,uint256)](backend/app/Downloads/Smart.sol#L1638-L1667)
	- [HoldEarn.notStart(uint256)](backend/app/Downloads/Smart.sol#L1215-L1218)
	- [HoldEarn.setDefaultToken(uint256,address,uint256)](backend/app/Downloads/Smart.sol#L1392-L1406)
	- [HoldEarn.setLockTime(uint256,uint256)](backend/app/Downloads/Smart.sol#L1381-L1390)
	- [HoldEarn.setMinNum(uint256,uint256)](backend/app/Downloads/Smart.sol#L1251-L1254)
	- [HoldEarn.setName(uint256,string)](backend/app/Downloads/Smart.sol#L1220-L1225)
	- [HoldEarn.setPeriodTime(uint256,uint256)](backend/app/Downloads/Smart.sol#L1370-L1379)
	- [HoldEarn.setUserNum(uint256,uint256,uint256)](backend/app/Downloads/Smart.sol#L1257-L1265)
	- [HoldEarn.setUserToken(address,uint256,uint256)](backend/app/Downloads/Smart.sol#L1267-L1274)
	- [HoldEarn.update(uint256)](backend/app/Downloads/Smart.sol#L1477-L1504)
	- [HoldEarn.withdrawAll(uint256)](backend/app/Downloads/Smart.sol#L1581-L1614)
	- [periodState[pID].totalDefaultAmount = afterAmount](backend/app/Downloads/Smart.sol#L1405)
	[HoldEarn.periodState](backend/app/Downloads/Smart.sol#L1194) can be used in cross function reentrancies:
	- [HoldEarn._getReward(uint256)](backend/app/Downloads/Smart.sol#L1669-L1708)
	- [HoldEarn._periodPrize(uint256,bool)](backend/app/Downloads/Smart.sol#L1506-L1545)
	- [HoldEarn.addNewPeriod(HoldEarn.PeriodInfo,HoldEarn.RewardTokenInfo[])](backend/app/Downloads/Smart.sol#L1409-L1440)
	- [HoldEarn.checkClaim(address,uint256)](backend/app/Downloads/Smart.sol#L1574-L1579)
	- [HoldEarn.checkDefault(address,address,uint256,uint256)](backend/app/Downloads/Smart.sol#L1995-L2012)
	- [HoldEarn.checkDeposit(address,uint256,uint256)](backend/app/Downloads/Smart.sol#L1769-L1781)
	- [HoldEarn.checkSetMinNum(address,uint256,uint256)](backend/app/Downloads/Smart.sol#L1617-L1636)
	- [HoldEarn.checkSort(address,uint256,uint256,address[])](backend/app/Downloads/Smart.sol#L1711-L1738)
	- [HoldEarn.deposit(uint256,uint256)](backend/app/Downloads/Smart.sol#L1456-L1475)
	- [HoldEarn.getStatus(uint256)](backend/app/Downloads/Smart.sol#L1864-L1892)
	- [HoldEarn.getUserReward(address,uint256,uint256)](backend/app/Downloads/Smart.sol#L1638-L1667)
	- [HoldEarn.periodState](backend/app/Downloads/Smart.sol#L1194)
	- [HoldEarn.setDefaultToken(uint256,address,uint256)](backend/app/Downloads/Smart.sol#L1392-L1406)
	- [HoldEarn.sortAccounts(uint256,uint256,address[])](backend/app/Downloads/Smart.sol#L1547-L1567)
	- [HoldEarn.update(uint256)](backend/app/Downloads/Smart.sol#L1477-L1504)

backend/app/Downloads/Smart.sol#L1392-L1406


 - [ ] ID-3
Reentrancy in [HoldEarn._getReward(uint256)](backend/app/Downloads/Smart.sol#L1669-L1708):
	External calls:
	- [_transferOut(msg.sender,rewardTokenInfo[pID][tID].rewardToken,sReward)](backend/app/Downloads/Smart.sol#L1681)
		- [returndata = address(token).functionCall(data,SafeERC20: low-level call failed)](backend/app/Downloads/Smart.sol#L791)
		- [IERC20(token).safeTransfer(user,amount)](backend/app/Downloads/Smart.sol#L2017)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
	External calls sending eth:
	- [_transferOut(msg.sender,rewardTokenInfo[pID][tID].rewardToken,sReward)](backend/app/Downloads/Smart.sol#L1681)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	State variables written after the call(s):
	- [userBet[msg.sender][pID].sTid.push(tID)](backend/app/Downloads/Smart.sol#L1679)
	[HoldEarn.userBet](backend/app/Downloads/Smart.sol#L1196) can be used in cross function reentrancies:
	- [HoldEarn._getReward(uint256)](backend/app/Downloads/Smart.sol#L1669-L1708)
	- [HoldEarn.checkClaim(address,uint256)](backend/app/Downloads/Smart.sol#L1574-L1579)
	- [HoldEarn.dealArray(uint256,uint256,address[])](backend/app/Downloads/Smart.sol#L1740-L1766)
	- [HoldEarn.deposit(uint256,uint256)](backend/app/Downloads/Smart.sol#L1456-L1475)
	- [HoldEarn.getUser(uint256,uint256)](backend/app/Downloads/Smart.sol#L1825-L1828)
	- [HoldEarn.getUserBet(address,uint256)](backend/app/Downloads/Smart.sol#L1894-L1896)
	- [HoldEarn.getUserReward(address,uint256,uint256)](backend/app/Downloads/Smart.sol#L1638-L1667)
	- [HoldEarn.withdrawAll(uint256)](backend/app/Downloads/Smart.sol#L1581-L1614)
	- [userReward[msg.sender][pID][tID].claimSort = sReward](backend/app/Downloads/Smart.sol#L1678)
	[HoldEarn.userReward](backend/app/Downloads/Smart.sol#L1184) can be used in cross function reentrancies:
	- [HoldEarn._getReward(uint256)](backend/app/Downloads/Smart.sol#L1669-L1708)
	- [HoldEarn.userReward](backend/app/Downloads/Smart.sol#L1184)

backend/app/Downloads/Smart.sol#L1669-L1708


## reentrancy-no-eth
Impact: Medium
Confidence: Medium
 - [ ] ID-4
Reentrancy in [HoldEarn.deposit(uint256,uint256)](backend/app/Downloads/Smart.sol#L1456-L1475):
	External calls:
	- [IERC20(periodInfo[pID].userToken).safeTransferFrom(msg.sender,address(this),amount)](backend/app/Downloads/Smart.sol#L1461)
	State variables written after the call(s):
	- [periodState[pID].totalAmount = periodState[pID].totalAmount.add(amount)](backend/app/Downloads/Smart.sol#L1463)
	[HoldEarn.periodState](backend/app/Downloads/Smart.sol#L1194) can be used in cross function reentrancies:
	- [HoldEarn._getReward(uint256)](backend/app/Downloads/Smart.sol#L1669-L1708)
	- [HoldEarn._periodPrize(uint256,bool)](backend/app/Downloads/Smart.sol#L1506-L1545)
	- [HoldEarn.addNewPeriod(HoldEarn.PeriodInfo,HoldEarn.RewardTokenInfo[])](backend/app/Downloads/Smart.sol#L1409-L1440)
	- [HoldEarn.checkClaim(address,uint256)](backend/app/Downloads/Smart.sol#L1574-L1579)
	- [HoldEarn.checkDefault(address,address,uint256,uint256)](backend/app/Downloads/Smart.sol#L1995-L2012)
	- [HoldEarn.checkDeposit(address,uint256,uint256)](backend/app/Downloads/Smart.sol#L1769-L1781)
	- [HoldEarn.checkSetMinNum(address,uint256,uint256)](backend/app/Downloads/Smart.sol#L1617-L1636)
	- [HoldEarn.checkSort(address,uint256,uint256,address[])](backend/app/Downloads/Smart.sol#L1711-L1738)
	- [HoldEarn.deposit(uint256,uint256)](backend/app/Downloads/Smart.sol#L1456-L1475)
	- [HoldEarn.getStatus(uint256)](backend/app/Downloads/Smart.sol#L1864-L1892)
	- [HoldEarn.getUserReward(address,uint256,uint256)](backend/app/Downloads/Smart.sol#L1638-L1667)
	- [HoldEarn.periodState](backend/app/Downloads/Smart.sol#L1194)
	- [HoldEarn.setDefaultToken(uint256,address,uint256)](backend/app/Downloads/Smart.sol#L1392-L1406)
	- [HoldEarn.sortAccounts(uint256,uint256,address[])](backend/app/Downloads/Smart.sol#L1547-L1567)
	- [HoldEarn.update(uint256)](backend/app/Downloads/Smart.sol#L1477-L1504)

backend/app/Downloads/Smart.sol#L1456-L1475


 - [ ] ID-5
Reentrancy in [HoldEarn.addNewPeriod(HoldEarn.PeriodInfo,HoldEarn.RewardTokenInfo[])](backend/app/Downloads/Smart.sol#L1409-L1440):
	External calls:
	- [IERC20(rInfo[i].rewardToken).safeTransferFrom(msg.sender,address(this),rInfo[i].totalAmount)](backend/app/Downloads/Smart.sol#L1427)
	State variables written after the call(s):
	- [tID = ++ tokenInfoID[periodID]](backend/app/Downloads/Smart.sol#L1418)
	[HoldEarn.tokenInfoID](backend/app/Downloads/Smart.sol#L1186) can be used in cross function reentrancies:
	- [HoldEarn.addNewPeriod(HoldEarn.PeriodInfo,HoldEarn.RewardTokenInfo[])](backend/app/Downloads/Smart.sol#L1409-L1440)
	- [HoldEarn.addToken(uint256,HoldEarn.RewardTokenInfo)](backend/app/Downloads/Smart.sol#L1276-L1300)
	- [HoldEarn.tokenInfoID](backend/app/Downloads/Smart.sol#L1186)

backend/app/Downloads/Smart.sol#L1409-L1440


## uninitialized-local
Impact: Medium
Confidence: Medium
 - [ ] ID-6
[HoldEarn.setRewardToken(uint256,uint256,address,uint256,uint256).tType](backend/app/Downloads/Smart.sol#L1357) is a local variable never initialized

backend/app/Downloads/Smart.sol#L1357


## unused-return
Impact: Medium
Confidence: Medium
 - [ ] ID-7
[HoldEarn.setRewardToken(uint256,uint256,address,uint256,uint256)](backend/app/Downloads/Smart.sol#L1321-L1368) ignores return value by [sortID[pID].add(tID)](backend/app/Downloads/Smart.sol#L1337)

backend/app/Downloads/Smart.sol#L1321-L1368


 - [ ] ID-8
[HoldEarn.setRewardToken(uint256,uint256,address,uint256,uint256)](backend/app/Downloads/Smart.sol#L1321-L1368) ignores return value by [rewardID[pID].remove(tID)](backend/app/Downloads/Smart.sol#L1336)

backend/app/Downloads/Smart.sol#L1321-L1368


 - [ ] ID-9
[HoldEarn.addToken(uint256,HoldEarn.RewardTokenInfo)](backend/app/Downloads/Smart.sol#L1276-L1300) ignores return value by [rewardID[pID].add(tID)](backend/app/Downloads/Smart.sol#L1292)

backend/app/Downloads/Smart.sol#L1276-L1300


 - [ ] ID-10
[HoldEarn.deposit(uint256,uint256)](backend/app/Downloads/Smart.sol#L1456-L1475) ignores return value by [remainDid[msg.sender][pID].add(id)](backend/app/Downloads/Smart.sol#L1471)

backend/app/Downloads/Smart.sol#L1456-L1475


 - [ ] ID-11
[HoldEarn.deposit(uint256,uint256)](backend/app/Downloads/Smart.sol#L1456-L1475) ignores return value by [users[pID].add(msg.sender)](backend/app/Downloads/Smart.sol#L1465)

backend/app/Downloads/Smart.sol#L1456-L1475


 - [ ] ID-12
[HoldEarn.removeToken(uint256,uint256)](backend/app/Downloads/Smart.sol#L1302-L1319) ignores return value by [sortID[pID].remove(tID)](backend/app/Downloads/Smart.sol#L1307)

backend/app/Downloads/Smart.sol#L1302-L1319


 - [ ] ID-13
[HoldEarn.dealArray(uint256,uint256,address[])](backend/app/Downloads/Smart.sol#L1740-L1766) ignores return value by [sortUsers[pID][tID].add(user)](backend/app/Downloads/Smart.sol#L1759)

backend/app/Downloads/Smart.sol#L1740-L1766


 - [ ] ID-14
[HoldEarn.setRewardToken(uint256,uint256,address,uint256,uint256)](backend/app/Downloads/Smart.sol#L1321-L1368) ignores return value by [sortID[pID].remove(tID)](backend/app/Downloads/Smart.sol#L1339)

backend/app/Downloads/Smart.sol#L1321-L1368


 - [ ] ID-15
[HoldEarn.withdrawAll(uint256)](backend/app/Downloads/Smart.sol#L1581-L1614) ignores return value by [hasClaimDid[msg.sender][pID].add(dID)](backend/app/Downloads/Smart.sol#L1595)

backend/app/Downloads/Smart.sol#L1581-L1614


 - [ ] ID-16
[HoldEarn.withdrawAll(uint256)](backend/app/Downloads/Smart.sol#L1581-L1614) ignores return value by [remainDid[msg.sender][pID].remove(remainDid[msg.sender][pID].at(0))](backend/app/Downloads/Smart.sol#L1605)

backend/app/Downloads/Smart.sol#L1581-L1614


 - [ ] ID-17
[HoldEarn.addToken(uint256,HoldEarn.RewardTokenInfo)](backend/app/Downloads/Smart.sol#L1276-L1300) ignores return value by [sortID[pID].add(tID)](backend/app/Downloads/Smart.sol#L1289)

backend/app/Downloads/Smart.sol#L1276-L1300


 - [ ] ID-18
[HoldEarn.addNewPeriod(HoldEarn.PeriodInfo,HoldEarn.RewardTokenInfo[])](backend/app/Downloads/Smart.sol#L1409-L1440) ignores return value by [sortID[periodID].add(tID)](backend/app/Downloads/Smart.sol#L1422)

backend/app/Downloads/Smart.sol#L1409-L1440


 - [ ] ID-19
[HoldEarn.addNewPeriod(HoldEarn.PeriodInfo,HoldEarn.RewardTokenInfo[])](backend/app/Downloads/Smart.sol#L1409-L1440) ignores return value by [rewardID[periodID].add(tID)](backend/app/Downloads/Smart.sol#L1424)

backend/app/Downloads/Smart.sol#L1409-L1440


 - [ ] ID-20
[HoldEarn.setRewardToken(uint256,uint256,address,uint256,uint256)](backend/app/Downloads/Smart.sol#L1321-L1368) ignores return value by [rewardID[pID].add(tID)](backend/app/Downloads/Smart.sol#L1340)

backend/app/Downloads/Smart.sol#L1321-L1368


 - [ ] ID-21
[HoldEarn.removeToken(uint256,uint256)](backend/app/Downloads/Smart.sol#L1302-L1319) ignores return value by [rewardID[pID].remove(tID)](backend/app/Downloads/Smart.sol#L1309)

backend/app/Downloads/Smart.sol#L1302-L1319


 - [ ] ID-22
[HoldEarn.removeToken(uint256,uint256)](backend/app/Downloads/Smart.sol#L1302-L1319) ignores return value by [removeID[pID].add(tID)](backend/app/Downloads/Smart.sol#L1305)

backend/app/Downloads/Smart.sol#L1302-L1319


 - [ ] ID-23
[HoldEarn.dealArray(uint256,uint256,address[])](backend/app/Downloads/Smart.sol#L1740-L1766) ignores return value by [sortUsers[pID][tID].add(user)](backend/app/Downloads/Smart.sol#L1763)

backend/app/Downloads/Smart.sol#L1740-L1766


## events-access
Impact: Low
Confidence: Medium
 - [ ] ID-24
[Operator.setOperator(address)](backend/app/Downloads/Smart.sol#L1088-L1090) should emit an event for: 
	- [operator = operator_](backend/app/Downloads/Smart.sol#L1089) 

backend/app/Downloads/Smart.sol#L1088-L1090


## missing-zero-check
Impact: Low
Confidence: Medium
 - [ ] ID-25
[HoldEarn.setSortAccount(address).account](backend/app/Downloads/Smart.sol#L1246) lacks a zero-check on :
		- [sortAccount = account](backend/app/Downloads/Smart.sol#L1247)

backend/app/Downloads/Smart.sol#L1246


 - [ ] ID-26
[Operator.setOperator(address).operator_](backend/app/Downloads/Smart.sol#L1088) lacks a zero-check on :
		- [operator = operator_](backend/app/Downloads/Smart.sol#L1089)

backend/app/Downloads/Smart.sol#L1088


## reentrancy-benign
Impact: Low
Confidence: Medium
 - [ ] ID-27
Reentrancy in [HoldEarn._periodPrize(uint256,bool)](backend/app/Downloads/Smart.sol#L1506-L1545):
	External calls:
	- [_transferOut(proAddress,rewardTokenInfo[pID][tID_scope_1].rewardToken,rewardTokenInfo[pID][tID_scope_1].totalAmount)](backend/app/Downloads/Smart.sol#L1523)
		- [returndata = address(token).functionCall(data,SafeERC20: low-level call failed)](backend/app/Downloads/Smart.sol#L791)
		- [IERC20(token).safeTransfer(user,amount)](backend/app/Downloads/Smart.sol#L2017)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
	External calls sending eth:
	- [_transferOut(proAddress,rewardTokenInfo[pID][tID_scope_1].rewardToken,rewardTokenInfo[pID][tID_scope_1].totalAmount)](backend/app/Downloads/Smart.sol#L1523)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	State variables written after the call(s):
	- [returnRewardAmount[pID][tID_scope_1] = rewardTokenInfo[pID][tID_scope_1].totalAmount](backend/app/Downloads/Smart.sol#L1522)

backend/app/Downloads/Smart.sol#L1506-L1545


 - [ ] ID-28
Reentrancy in [HoldEarn._periodPrize(uint256,bool)](backend/app/Downloads/Smart.sol#L1506-L1545):
	External calls:
	- [_transferOut(proAddress,periodInfo[pID].defaultToken,periodState[pID].totalDefaultAmount)](backend/app/Downloads/Smart.sol#L1512)
		- [returndata = address(token).functionCall(data,SafeERC20: low-level call failed)](backend/app/Downloads/Smart.sol#L791)
		- [IERC20(token).safeTransfer(user,amount)](backend/app/Downloads/Smart.sol#L2017)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
	External calls sending eth:
	- [_transferOut(proAddress,periodInfo[pID].defaultToken,periodState[pID].totalDefaultAmount)](backend/app/Downloads/Smart.sol#L1512)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	State variables written after the call(s):
	- [rewardTokenInfo[pID][tID].perAmount = rewardTokenInfo[pID][tID].totalAmount.mul(muti).div(periodState[pID].totalAmount)](backend/app/Downloads/Smart.sol#L1516)

backend/app/Downloads/Smart.sol#L1506-L1545


 - [ ] ID-29
Reentrancy in [HoldEarn.deposit(uint256,uint256)](backend/app/Downloads/Smart.sol#L1456-L1475):
	External calls:
	- [IERC20(periodInfo[pID].userToken).safeTransferFrom(msg.sender,address(this),amount)](backend/app/Downloads/Smart.sol#L1461)
	- [update(pID)](backend/app/Downloads/Smart.sol#L1473)
		- [returndata = address(token).functionCall(data,SafeERC20: low-level call failed)](backend/app/Downloads/Smart.sol#L791)
		- [IERC20(token).safeTransfer(user,amount)](backend/app/Downloads/Smart.sol#L2017)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
	External calls sending eth:
	- [update(pID)](backend/app/Downloads/Smart.sol#L1473)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	State variables written after the call(s):
	- [update(pID)](backend/app/Downloads/Smart.sol#L1473)
		- [returnDefaultAmount[pID] = periodState[pID].totalDefaultAmount](backend/app/Downloads/Smart.sol#L1511)
		- [returnDefaultAmount[pID] = periodState[pID].totalDefaultAmount](backend/app/Downloads/Smart.sol#L1534)
		- [returnDefaultAmount[pID] = value](backend/app/Downloads/Smart.sol#L1540)
	- [update(pID)](backend/app/Downloads/Smart.sol#L1473)
		- [returnRewardAmount[pID][tID_scope_1] = rewardTokenInfo[pID][tID_scope_1].totalAmount](backend/app/Downloads/Smart.sol#L1522)
		- [returnRewardAmount[pID][tID_scope_3] = rewardTokenInfo[pID][tID_scope_3].totalAmount](backend/app/Downloads/Smart.sol#L1528)

backend/app/Downloads/Smart.sol#L1456-L1475


 - [ ] ID-30
Reentrancy in [HoldEarn.deposit(uint256,uint256)](backend/app/Downloads/Smart.sol#L1456-L1475):
	External calls:
	- [IERC20(periodInfo[pID].userToken).safeTransferFrom(msg.sender,address(this),amount)](backend/app/Downloads/Smart.sol#L1461)
	State variables written after the call(s):
	- [userBet[msg.sender][pID].totalAmount = userBet[msg.sender][pID].totalAmount.add(amount)](backend/app/Downloads/Smart.sol#L1467)
	- [id = ++ userBet[msg.sender][pID].dID](backend/app/Downloads/Smart.sol#L1468)
	- [userInfo[msg.sender][pID][id].amount = amount](backend/app/Downloads/Smart.sol#L1469)
	- [userInfo[msg.sender][pID][id].depositTime = block.timestamp](backend/app/Downloads/Smart.sol#L1470)

backend/app/Downloads/Smart.sol#L1456-L1475


 - [ ] ID-31
Reentrancy in [HoldEarn._periodPrize(uint256,bool)](backend/app/Downloads/Smart.sol#L1506-L1545):
	External calls:
	- [_transferOut(proAddress,rewardTokenInfo[pID][tID_scope_1].rewardToken,rewardTokenInfo[pID][tID_scope_1].totalAmount)](backend/app/Downloads/Smart.sol#L1523)
		- [returndata = address(token).functionCall(data,SafeERC20: low-level call failed)](backend/app/Downloads/Smart.sol#L791)
		- [IERC20(token).safeTransfer(user,amount)](backend/app/Downloads/Smart.sol#L2017)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
	- [_transferOut(proAddress,rewardTokenInfo[pID][tID_scope_3].rewardToken,rewardTokenInfo[pID][tID_scope_3].totalAmount)](backend/app/Downloads/Smart.sol#L1529)
		- [returndata = address(token).functionCall(data,SafeERC20: low-level call failed)](backend/app/Downloads/Smart.sol#L791)
		- [IERC20(token).safeTransfer(user,amount)](backend/app/Downloads/Smart.sol#L2017)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
	External calls sending eth:
	- [_transferOut(proAddress,rewardTokenInfo[pID][tID_scope_1].rewardToken,rewardTokenInfo[pID][tID_scope_1].totalAmount)](backend/app/Downloads/Smart.sol#L1523)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	- [_transferOut(proAddress,rewardTokenInfo[pID][tID_scope_3].rewardToken,rewardTokenInfo[pID][tID_scope_3].totalAmount)](backend/app/Downloads/Smart.sol#L1529)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	State variables written after the call(s):
	- [returnDefaultAmount[pID] = periodState[pID].totalDefaultAmount](backend/app/Downloads/Smart.sol#L1534)
	- [returnDefaultAmount[pID] = value](backend/app/Downloads/Smart.sol#L1540)
	- [returnRewardAmount[pID][tID_scope_3] = rewardTokenInfo[pID][tID_scope_3].totalAmount](backend/app/Downloads/Smart.sol#L1528)

backend/app/Downloads/Smart.sol#L1506-L1545


 - [ ] ID-32
Reentrancy in [HoldEarn.addNewPeriod(HoldEarn.PeriodInfo,HoldEarn.RewardTokenInfo[])](backend/app/Downloads/Smart.sol#L1409-L1440):
	External calls:
	- [IERC20(rInfo[i].rewardToken).safeTransferFrom(msg.sender,address(this),rInfo[i].totalAmount)](backend/app/Downloads/Smart.sol#L1427)
	State variables written after the call(s):
	- [periodState[periodID].totalDefaultAmount = amount](backend/app/Downloads/Smart.sol#L1433)
	- [rewardTokenInfo[periodID][tID] = rInfo[i]](backend/app/Downloads/Smart.sol#L1419)

backend/app/Downloads/Smart.sol#L1409-L1440


## reentrancy-events
Impact: Low
Confidence: Medium
 - [ ] ID-33
Reentrancy in [HoldEarn.removeToken(uint256,uint256)](backend/app/Downloads/Smart.sol#L1302-L1319):
	External calls:
	- [IERC20(rewardTokenInfo[pID][tID].rewardToken).safeTransfer(msg.sender,rewardTokenInfo[pID][tID].totalAmount)](backend/app/Downloads/Smart.sol#L1313)
	External calls sending eth:
	- [address(msg.sender).transfer(rewardTokenInfo[pID][tID].totalAmount)](backend/app/Downloads/Smart.sol#L1315)
	Event emitted after the call(s):
	- [RemoveToken(rewardTokenInfo[pID][tID].rewardToken,rewardTokenInfo[pID][tID].totalAmount,pID,tID)](backend/app/Downloads/Smart.sol#L1318)

backend/app/Downloads/Smart.sol#L1302-L1319


 - [ ] ID-34
Reentrancy in [HoldEarn.addToken(uint256,HoldEarn.RewardTokenInfo)](backend/app/Downloads/Smart.sol#L1276-L1300):
	External calls:
	- [IERC20(rInfo.rewardToken).safeTransferFrom(msg.sender,address(this),rInfo.totalAmount)](backend/app/Downloads/Smart.sol#L1296)
	Event emitted after the call(s):
	- [AddToken(rInfo.rewardToken,rInfo.totalAmount,pID,tID,tType)](backend/app/Downloads/Smart.sol#L1299)

backend/app/Downloads/Smart.sol#L1276-L1300


 - [ ] ID-35
Reentrancy in [HoldEarn.addNewPeriod(HoldEarn.PeriodInfo,HoldEarn.RewardTokenInfo[])](backend/app/Downloads/Smart.sol#L1409-L1440):
	External calls:
	- [IERC20(rInfo[i].rewardToken).safeTransferFrom(msg.sender,address(this),rInfo[i].totalAmount)](backend/app/Downloads/Smart.sol#L1427)
	- [IERC20(newInfo.defaultToken).safeTransferFrom(msg.sender,address(this),amount)](backend/app/Downloads/Smart.sol#L1435)
	Event emitted after the call(s):
	- [AddNewPeriod(periodID)](backend/app/Downloads/Smart.sol#L1439)

backend/app/Downloads/Smart.sol#L1409-L1440


 - [ ] ID-36
Reentrancy in [HoldEarn.setRewardToken(uint256,uint256,address,uint256,uint256)](backend/app/Downloads/Smart.sol#L1321-L1368):
	External calls:
	- [_transferOut(msg.sender,rToken,amount)](backend/app/Downloads/Smart.sol#L1349)
		- [returndata = address(token).functionCall(data,SafeERC20: low-level call failed)](backend/app/Downloads/Smart.sol#L791)
		- [IERC20(token).safeTransfer(user,amount)](backend/app/Downloads/Smart.sol#L2017)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
	- [IERC20(token).safeTransferFrom(msg.sender,address(this),tokenAmount)](backend/app/Downloads/Smart.sol#L1354)
	External calls sending eth:
	- [_transferOut(msg.sender,rToken,amount)](backend/app/Downloads/Smart.sol#L1349)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	Event emitted after the call(s):
	- [ChangeToken(pID,tID,rToken,token,amount,tokenAmount,tType)](backend/app/Downloads/Smart.sol#L1365)

backend/app/Downloads/Smart.sol#L1321-L1368


 - [ ] ID-37
Reentrancy in [HoldEarn._getReward(uint256)](backend/app/Downloads/Smart.sol#L1669-L1708):
	External calls:
	- [_transferOut(msg.sender,periodInfo[pID].defaultToken,periodInfo[pID].perDefaultAmount)](backend/app/Downloads/Smart.sol#L1700)
		- [returndata = address(token).functionCall(data,SafeERC20: low-level call failed)](backend/app/Downloads/Smart.sol#L791)
		- [IERC20(token).safeTransfer(user,amount)](backend/app/Downloads/Smart.sol#L2017)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
	External calls sending eth:
	- [_transferOut(msg.sender,periodInfo[pID].defaultToken,periodInfo[pID].perDefaultAmount)](backend/app/Downloads/Smart.sol#L1700)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	Event emitted after the call(s):
	- [ClaimDefaultReward(msg.sender,periodInfo[pID].defaultToken,pID,periodInfo[pID].perDefaultAmount)](backend/app/Downloads/Smart.sol#L1701)

backend/app/Downloads/Smart.sol#L1669-L1708


 - [ ] ID-38
Reentrancy in [HoldEarn.update(uint256)](backend/app/Downloads/Smart.sol#L1477-L1504):
	External calls:
	- [_periodPrize(pID,false)](backend/app/Downloads/Smart.sol#L1499)
		- [returndata = address(token).functionCall(data,SafeERC20: low-level call failed)](backend/app/Downloads/Smart.sol#L791)
		- [IERC20(token).safeTransfer(user,amount)](backend/app/Downloads/Smart.sol#L2017)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
	External calls sending eth:
	- [_periodPrize(pID,false)](backend/app/Downloads/Smart.sol#L1499)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	Event emitted after the call(s):
	- [PeriodUpdate(pID)](backend/app/Downloads/Smart.sol#L1501)

backend/app/Downloads/Smart.sol#L1477-L1504


 - [ ] ID-39
Reentrancy in [HoldEarn.update(uint256)](backend/app/Downloads/Smart.sol#L1477-L1504):
	External calls:
	- [_periodPrize(pID,true)](backend/app/Downloads/Smart.sol#L1491)
		- [returndata = address(token).functionCall(data,SafeERC20: low-level call failed)](backend/app/Downloads/Smart.sol#L791)
		- [IERC20(token).safeTransfer(user,amount)](backend/app/Downloads/Smart.sol#L2017)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
	External calls sending eth:
	- [_periodPrize(pID,true)](backend/app/Downloads/Smart.sol#L1491)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	Event emitted after the call(s):
	- [PeriodUpdate(pID)](backend/app/Downloads/Smart.sol#L1493)

backend/app/Downloads/Smart.sol#L1477-L1504


 - [ ] ID-40
Reentrancy in [HoldEarn._getReward(uint256)](backend/app/Downloads/Smart.sol#L1669-L1708):
	External calls:
	- [_transferOut(msg.sender,rewardTokenInfo[pID][tID].rewardToken,sReward)](backend/app/Downloads/Smart.sol#L1681)
		- [returndata = address(token).functionCall(data,SafeERC20: low-level call failed)](backend/app/Downloads/Smart.sol#L791)
		- [IERC20(token).safeTransfer(user,amount)](backend/app/Downloads/Smart.sol#L2017)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
	- [_transferOut(msg.sender,rewardTokenInfo[pID][tID_scope_0].rewardToken,bReward)](backend/app/Downloads/Smart.sol#L1693)
		- [returndata = address(token).functionCall(data,SafeERC20: low-level call failed)](backend/app/Downloads/Smart.sol#L791)
		- [IERC20(token).safeTransfer(user,amount)](backend/app/Downloads/Smart.sol#L2017)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
	External calls sending eth:
	- [_transferOut(msg.sender,rewardTokenInfo[pID][tID].rewardToken,sReward)](backend/app/Downloads/Smart.sol#L1681)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	- [_transferOut(msg.sender,rewardTokenInfo[pID][tID_scope_0].rewardToken,bReward)](backend/app/Downloads/Smart.sol#L1693)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	Event emitted after the call(s):
	- [ClaimBaseReward(msg.sender,rewardTokenInfo[pID][tID_scope_0].rewardToken,pID,tID_scope_0,bReward)](backend/app/Downloads/Smart.sol#L1695)

backend/app/Downloads/Smart.sol#L1669-L1708


 - [ ] ID-41
Reentrancy in [HoldEarn.deposit(uint256,uint256)](backend/app/Downloads/Smart.sol#L1456-L1475):
	External calls:
	- [IERC20(periodInfo[pID].userToken).safeTransferFrom(msg.sender,address(this),amount)](backend/app/Downloads/Smart.sol#L1461)
	- [update(pID)](backend/app/Downloads/Smart.sol#L1473)
		- [returndata = address(token).functionCall(data,SafeERC20: low-level call failed)](backend/app/Downloads/Smart.sol#L791)
		- [IERC20(token).safeTransfer(user,amount)](backend/app/Downloads/Smart.sol#L2017)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
	External calls sending eth:
	- [update(pID)](backend/app/Downloads/Smart.sol#L1473)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	Event emitted after the call(s):
	- [Deposit(msg.sender,periodInfo[pID].userToken,pID,id,amount,userInfo[msg.sender][pID][id].depositTime)](backend/app/Downloads/Smart.sol#L1474)
	- [PeriodUpdate(pID)](backend/app/Downloads/Smart.sol#L1493)
		- [update(pID)](backend/app/Downloads/Smart.sol#L1473)
	- [PeriodUpdate(pID)](backend/app/Downloads/Smart.sol#L1501)
		- [update(pID)](backend/app/Downloads/Smart.sol#L1473)

backend/app/Downloads/Smart.sol#L1456-L1475


 - [ ] ID-42
Reentrancy in [HoldEarn._getReward(uint256)](backend/app/Downloads/Smart.sol#L1669-L1708):
	External calls:
	- [_transferOut(msg.sender,rewardTokenInfo[pID][tID].rewardToken,sReward)](backend/app/Downloads/Smart.sol#L1681)
		- [returndata = address(token).functionCall(data,SafeERC20: low-level call failed)](backend/app/Downloads/Smart.sol#L791)
		- [IERC20(token).safeTransfer(user,amount)](backend/app/Downloads/Smart.sol#L2017)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
	External calls sending eth:
	- [_transferOut(msg.sender,rewardTokenInfo[pID][tID].rewardToken,sReward)](backend/app/Downloads/Smart.sol#L1681)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	Event emitted after the call(s):
	- [ClaimSortReward(msg.sender,rewardTokenInfo[pID][tID].rewardToken,pID,tID,sReward)](backend/app/Downloads/Smart.sol#L1682)

backend/app/Downloads/Smart.sol#L1669-L1708


 - [ ] ID-43
Reentrancy in [HoldEarn.transferTo(address,address,uint256)](backend/app/Downloads/Smart.sol#L1442-L1454):
	External calls:
	- [IERC20(token).safeTransfer(account,amount)](backend/app/Downloads/Smart.sol#L1447)
	External calls sending eth:
	- [address(account).transfer(amount)](backend/app/Downloads/Smart.sol#L1450)
	Event emitted after the call(s):
	- [TransferTo(address(token),account,amount)](backend/app/Downloads/Smart.sol#L1453)

backend/app/Downloads/Smart.sol#L1442-L1454


 - [ ] ID-44
Reentrancy in [HoldEarn.withdrawAll(uint256)](backend/app/Downloads/Smart.sol#L1581-L1614):
	External calls:
	- [_transferOut(msg.sender,periodInfo[pID].userToken,amount)](backend/app/Downloads/Smart.sol#L1610)
		- [returndata = address(token).functionCall(data,SafeERC20: low-level call failed)](backend/app/Downloads/Smart.sol#L791)
		- [IERC20(token).safeTransfer(user,amount)](backend/app/Downloads/Smart.sol#L2017)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
	External calls sending eth:
	- [_transferOut(msg.sender,periodInfo[pID].userToken,amount)](backend/app/Downloads/Smart.sol#L1610)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	Event emitted after the call(s):
	- [WithdrawAll(msg.sender,pID,num,amount)](backend/app/Downloads/Smart.sol#L1612)

backend/app/Downloads/Smart.sol#L1581-L1614


## timestamp
Impact: Low
Confidence: Medium
 - [ ] ID-45
[HoldEarn.checkWithdraw(address,uint256)](backend/app/Downloads/Smart.sol#L2030-L2051) uses timestamp for comparisons
	Dangerous comparisons:
	- [require(bool,string)(block.timestamp > userInfo[user][pID][remainDid[user][pID].at(0)].depositTime.add(periodInfo[pID].lockTime) && ! userInfo[user][pID][remainDid[user][pID].at(0)].isClaim,no unLock)](backend/app/Downloads/Smart.sol#L2044-L2048)

backend/app/Downloads/Smart.sol#L2030-L2051


 - [ ] ID-46
[HoldEarn.checkBase(address,uint256)](backend/app/Downloads/Smart.sol#L1227-L1234) uses timestamp for comparisons
	Dangerous comparisons:
	- [require(bool,string)((user == owner() || user == operator) && 0 < pID && pID <= periodID && block.timestamp < periodInfo[pID].startTime,parama)](backend/app/Downloads/Smart.sol#L1228-L1233)

backend/app/Downloads/Smart.sol#L1227-L1234


 - [ ] ID-47
[HoldEarn.checkSetMinNum(address,uint256,uint256)](backend/app/Downloads/Smart.sol#L1617-L1636) uses timestamp for comparisons
	Dangerous comparisons:
	- [require(bool,string)(block.timestamp < periodInfo[pID].startTime.add(periodInfo[pID].periodTime) || periodState[pID].endTime != 0,has end)](backend/app/Downloads/Smart.sol#L1623-L1627)

backend/app/Downloads/Smart.sol#L1617-L1636


 - [ ] ID-48
[HoldEarn.withdrawAll(uint256)](backend/app/Downloads/Smart.sol#L1581-L1614) uses timestamp for comparisons
	Dangerous comparisons:
	- [block.timestamp > userInfo[msg.sender][pID][dID].depositTime.add(periodInfo[pID].lockTime)](backend/app/Downloads/Smart.sol#L1591-L1592)

backend/app/Downloads/Smart.sol#L1581-L1614


 - [ ] ID-49
[HoldEarn.checkDeposit(address,uint256,uint256)](backend/app/Downloads/Smart.sol#L1769-L1781) uses timestamp for comparisons
	Dangerous comparisons:
	- [require(bool,string)(block.timestamp >= periodInfo[pID].startTime && block.timestamp < periodInfo[pID].startTime.add(periodInfo[pID].periodTime) && periodState[pID].endTime == 0,time err)](backend/app/Downloads/Smart.sol#L1772-L1776)

backend/app/Downloads/Smart.sol#L1769-L1781


 - [ ] ID-50
[HoldEarn.checkNewPeriod(address,HoldEarn.PeriodInfo,HoldEarn.RewardTokenInfo[])](backend/app/Downloads/Smart.sol#L1783-L1819) uses timestamp for comparisons
	Dangerous comparisons:
	- [require(bool,string)(newInfo.startTime > block.timestamp && newInfo.periodTime > 0 && newInfo.lockTime > 0,time err)](backend/app/Downloads/Smart.sol#L1798)

backend/app/Downloads/Smart.sol#L1783-L1819


 - [ ] ID-51
[HoldEarn.check(address,uint256)](backend/app/Downloads/Smart.sol#L1910-L1914) uses timestamp for comparisons
	Dangerous comparisons:
	- [require(bool,string)(block.timestamp < periodInfo[pID].startTime,has start)](backend/app/Downloads/Smart.sol#L1913)

backend/app/Downloads/Smart.sol#L1910-L1914


 - [ ] ID-52
[HoldEarn.getStatus(uint256)](backend/app/Downloads/Smart.sol#L1864-L1892) uses timestamp for comparisons
	Dangerous comparisons:
	- [block.timestamp < periodInfo[pID].startTime](backend/app/Downloads/Smart.sol#L1867)
	- [periodInfo[pID].startTime <= block.timestamp && periodState[pID].endTime == 0 && block.timestamp < periodInfo[pID].startTime.add(periodInfo[pID].periodTime)](backend/app/Downloads/Smart.sol#L1870-L1872)
	- [(periodState[pID].endTime != 0 && periodState[pID].endTime <= block.timestamp || block.timestamp >= periodInfo[pID].startTime.add(periodInfo[pID].periodTime)) && ! periodState[pID].isSort](backend/app/Downloads/Smart.sol#L1876-L1879)
	- [periodState[pID].endTime != 0 && periodState[pID].endTime <= block.timestamp && periodState[pID].isSort](backend/app/Downloads/Smart.sol#L1884-L1886)

backend/app/Downloads/Smart.sol#L1864-L1892


 - [ ] ID-53
[HoldEarn.update(uint256)](backend/app/Downloads/Smart.sol#L1477-L1504) uses timestamp for comparisons
	Dangerous comparisons:
	- [users[pID].length() == periodInfo[pID].maxUserNum || (block.timestamp > time && users[pID].length() >= periodInfo[pID].minUserNum)](backend/app/Downloads/Smart.sol#L1481-L1482)
	- [block.timestamp > time](backend/app/Downloads/Smart.sol#L1484)
	- [users[pID].length() < periodInfo[pID].minUserNum && block.timestamp > time](backend/app/Downloads/Smart.sol#L1495)

backend/app/Downloads/Smart.sol#L1477-L1504


## assembly
Impact: Informational
Confidence: High
 - [ ] ID-54
[EnumerableSet.values(EnumerableSet.UintSet)](backend/app/Downloads/Smart.sol#L687-L697) uses assembly
	- [INLINE ASM](backend/app/Downloads/Smart.sol#L692-L694)

backend/app/Downloads/Smart.sol#L687-L697


 - [ ] ID-55
[Address._revert(bytes,string)](backend/app/Downloads/Smart.sol#L354-L366) uses assembly
	- [INLINE ASM](backend/app/Downloads/Smart.sol#L359-L362)

backend/app/Downloads/Smart.sol#L354-L366


 - [ ] ID-56
[EnumerableSet.values(EnumerableSet.AddressSet)](backend/app/Downloads/Smart.sol#L613-L623) uses assembly
	- [INLINE ASM](backend/app/Downloads/Smart.sol#L618-L620)

backend/app/Downloads/Smart.sol#L613-L623


## dead-code
Impact: Informational
Confidence: Medium
 - [ ] ID-57
[EnumerableSet.values(EnumerableSet.Bytes32Set)](backend/app/Downloads/Smart.sol#L547-L549) is never used and should be removed

backend/app/Downloads/Smart.sol#L547-L549


 - [ ] ID-58
[Address.verifyCallResult(bool,bytes,string)](backend/app/Downloads/Smart.sol#L342-L352) is never used and should be removed

backend/app/Downloads/Smart.sol#L342-L352


 - [ ] ID-59
[SafeMath.sub(uint256,uint256)](backend/app/Downloads/Smart.sol#L827-L829) is never used and should be removed

backend/app/Downloads/Smart.sol#L827-L829


 - [ ] ID-60
[SafeMath.average(uint256,uint256)](backend/app/Downloads/Smart.sol#L990-L993) is never used and should be removed

backend/app/Downloads/Smart.sol#L990-L993


 - [ ] ID-61
[EnumerableSet.length(EnumerableSet.Bytes32Set)](backend/app/Downloads/Smart.sol#L521-L523) is never used and should be removed

backend/app/Downloads/Smart.sol#L521-L523


 - [ ] ID-62
[EnumerableSet.at(EnumerableSet.Bytes32Set,uint256)](backend/app/Downloads/Smart.sol#L535-L537) is never used and should be removed

backend/app/Downloads/Smart.sol#L535-L537


 - [ ] ID-63
[Address.sendValue(address,uint256)](backend/app/Downloads/Smart.sol#L183-L188) is never used and should be removed

backend/app/Downloads/Smart.sol#L183-L188


 - [ ] ID-64
[Address.functionCallWithValue(address,bytes,uint256)](backend/app/Downloads/Smart.sol#L237-L243) is never used and should be removed

backend/app/Downloads/Smart.sol#L237-L243


 - [ ] ID-65
[EnumerableSet.contains(EnumerableSet.Bytes32Set,bytes32)](backend/app/Downloads/Smart.sol#L514-L516) is never used and should be removed

backend/app/Downloads/Smart.sol#L514-L516


 - [ ] ID-66
[Address.functionDelegateCall(address,bytes,string)](backend/app/Downloads/Smart.sol#L303-L310) is never used and should be removed

backend/app/Downloads/Smart.sol#L303-L310


 - [ ] ID-67
[SafeMath.percentageOfTotal(uint256,uint256)](backend/app/Downloads/Smart.sol#L981-L983) is never used and should be removed

backend/app/Downloads/Smart.sol#L981-L983


 - [ ] ID-68
[SafeMath.sub(uint256,uint256,string)](backend/app/Downloads/Smart.sol#L841-L850) is never used and should be removed

backend/app/Downloads/Smart.sol#L841-L850


 - [ ] ID-69
[SafeMath.percentageAmount(uint256,uint8)](backend/app/Downloads/Smart.sol#L970-L972) is never used and should be removed

backend/app/Downloads/Smart.sol#L970-L972


 - [ ] ID-70
[SafeMath.bondingCurve(uint256,uint256)](backend/app/Downloads/Smart.sol#L999-L1001) is never used and should be removed

backend/app/Downloads/Smart.sol#L999-L1001


 - [ ] ID-71
[Address.functionDelegateCall(address,bytes)](backend/app/Downloads/Smart.sol#L293-L295) is never used and should be removed

backend/app/Downloads/Smart.sol#L293-L295


 - [ ] ID-72
[SafeERC20.safeIncreaseAllowance(IERC20,address,uint256)](backend/app/Downloads/Smart.sol#L742-L749) is never used and should be removed

backend/app/Downloads/Smart.sol#L742-L749


 - [ ] ID-73
[SafeERC20.safePermit(IERC20Permit,address,address,uint256,uint256,uint8,bytes32,bytes32)](backend/app/Downloads/Smart.sol#L764-L778) is never used and should be removed

backend/app/Downloads/Smart.sol#L764-L778


 - [ ] ID-74
[EnumerableSet.values(EnumerableSet.AddressSet)](backend/app/Downloads/Smart.sol#L613-L623) is never used and should be removed

backend/app/Downloads/Smart.sol#L613-L623


 - [ ] ID-75
[EnumerableSet.remove(EnumerableSet.AddressSet,address)](backend/app/Downloads/Smart.sol#L573-L575) is never used and should be removed

backend/app/Downloads/Smart.sol#L573-L575


 - [ ] ID-76
[SafeMath.sqrrt(uint256)](backend/app/Downloads/Smart.sol#L954-L965) is never used and should be removed

backend/app/Downloads/Smart.sol#L954-L965


 - [ ] ID-77
[SafeERC20.safeApprove(IERC20,address,uint256)](backend/app/Downloads/Smart.sol#L727-L740) is never used and should be removed

backend/app/Downloads/Smart.sol#L727-L740


 - [ ] ID-78
[SafeMath.quadraticPricing(uint256,uint256)](backend/app/Downloads/Smart.sol#L995-L997) is never used and should be removed

backend/app/Downloads/Smart.sol#L995-L997


 - [ ] ID-79
[SafeMath.mod(uint256,uint256,string)](backend/app/Downloads/Smart.sol#L944-L951) is never used and should be removed

backend/app/Downloads/Smart.sol#L944-L951


 - [ ] ID-80
[EnumerableSet.add(EnumerableSet.Bytes32Set,bytes32)](backend/app/Downloads/Smart.sol#L497-L499) is never used and should be removed

backend/app/Downloads/Smart.sol#L497-L499


 - [ ] ID-81
[EnumerableSet._values(EnumerableSet.Set)](backend/app/Downloads/Smart.sol#L481-L483) is never used and should be removed

backend/app/Downloads/Smart.sol#L481-L483


 - [ ] ID-82
[EnumerableSet.values(EnumerableSet.UintSet)](backend/app/Downloads/Smart.sol#L687-L697) is never used and should be removed

backend/app/Downloads/Smart.sol#L687-L697


 - [ ] ID-83
[Context._msgData()](backend/app/Downloads/Smart.sol#L1009-L1011) is never used and should be removed

backend/app/Downloads/Smart.sol#L1009-L1011


 - [ ] ID-84
[Address.functionStaticCall(address,bytes)](backend/app/Downloads/Smart.sol#L268-L270) is never used and should be removed

backend/app/Downloads/Smart.sol#L268-L270


 - [ ] ID-85
[SafeMath.mod(uint256,uint256)](backend/app/Downloads/Smart.sol#L928-L930) is never used and should be removed

backend/app/Downloads/Smart.sol#L928-L930


 - [ ] ID-86
[SafeMath.substractPercentage(uint256,uint8)](backend/app/Downloads/Smart.sol#L977-L979) is never used and should be removed

backend/app/Downloads/Smart.sol#L977-L979


 - [ ] ID-87
[SafeERC20.safeDecreaseAllowance(IERC20,address,uint256)](backend/app/Downloads/Smart.sol#L751-L762) is never used and should be removed

backend/app/Downloads/Smart.sol#L751-L762


 - [ ] ID-88
[Address.functionStaticCall(address,bytes,string)](backend/app/Downloads/Smart.sol#L278-L285) is never used and should be removed

backend/app/Downloads/Smart.sol#L278-L285


 - [ ] ID-89
[EnumerableSet.remove(EnumerableSet.Bytes32Set,bytes32)](backend/app/Downloads/Smart.sol#L507-L509) is never used and should be removed

backend/app/Downloads/Smart.sol#L507-L509


 - [ ] ID-90
[Address.functionCall(address,bytes)](backend/app/Downloads/Smart.sol#L208-L210) is never used and should be removed

backend/app/Downloads/Smart.sol#L208-L210


## solc-version
Impact: Informational
Confidence: High
 - [ ] ID-91
solc-0.8.4 is not recommended for deployment

 - [ ] ID-92
Pragma version[0.8.4](backend/app/Downloads/Smart.sol#L1) allows old versions

backend/app/Downloads/Smart.sol#L1


## low-level-calls
Impact: Informational
Confidence: High
 - [ ] ID-93
Low level call in [Address.functionCallWithValue(address,bytes,uint256,string)](backend/app/Downloads/Smart.sol#L251-L260):
	- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)

backend/app/Downloads/Smart.sol#L251-L260


 - [ ] ID-94
Low level call in [Address.functionStaticCall(address,bytes,string)](backend/app/Downloads/Smart.sol#L278-L285):
	- [(success,returndata) = target.staticcall(data)](backend/app/Downloads/Smart.sol#L283)

backend/app/Downloads/Smart.sol#L278-L285


 - [ ] ID-95
Low level call in [Address.sendValue(address,uint256)](backend/app/Downloads/Smart.sol#L183-L188):
	- [(success) = recipient.call{value: amount}()](backend/app/Downloads/Smart.sol#L186)

backend/app/Downloads/Smart.sol#L183-L188


 - [ ] ID-96
Low level call in [Address.functionDelegateCall(address,bytes,string)](backend/app/Downloads/Smart.sol#L303-L310):
	- [(success,returndata) = target.delegatecall(data)](backend/app/Downloads/Smart.sol#L308)

backend/app/Downloads/Smart.sol#L303-L310


## naming-convention
Impact: Informational
Confidence: High
 - [ ] ID-97
Constant [Operator.baseRate](backend/app/Downloads/Smart.sol#L1081) is not in UPPER_CASE_WITH_UNDERSCORES

backend/app/Downloads/Smart.sol#L1081


 - [ ] ID-98
Function [IERC20Permit.DOMAIN_SEPARATOR()](backend/app/Downloads/Smart.sol#L129) is not in mixedCase

backend/app/Downloads/Smart.sol#L129


 - [ ] ID-99
Constant [HoldEarn.muti](backend/app/Downloads/Smart.sol#L1123) is not in UPPER_CASE_WITH_UNDERSCORES

backend/app/Downloads/Smart.sol#L1123


## reentrancy-unlimited-gas
Impact: Informational
Confidence: Medium
 - [ ] ID-100
Reentrancy in [HoldEarn.withdrawAll(uint256)](backend/app/Downloads/Smart.sol#L1581-L1614):
	External calls:
	- [_transferOut(msg.sender,periodInfo[pID].userToken,amount)](backend/app/Downloads/Smart.sol#L1610)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	External calls sending eth:
	- [_transferOut(msg.sender,periodInfo[pID].userToken,amount)](backend/app/Downloads/Smart.sol#L1610)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	Event emitted after the call(s):
	- [WithdrawAll(msg.sender,pID,num,amount)](backend/app/Downloads/Smart.sol#L1612)

backend/app/Downloads/Smart.sol#L1581-L1614


 - [ ] ID-101
Reentrancy in [HoldEarn.deposit(uint256,uint256)](backend/app/Downloads/Smart.sol#L1456-L1475):
	External calls:
	- [update(pID)](backend/app/Downloads/Smart.sol#L1473)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	External calls sending eth:
	- [update(pID)](backend/app/Downloads/Smart.sol#L1473)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	Event emitted after the call(s):
	- [Deposit(msg.sender,periodInfo[pID].userToken,pID,id,amount,userInfo[msg.sender][pID][id].depositTime)](backend/app/Downloads/Smart.sol#L1474)

backend/app/Downloads/Smart.sol#L1456-L1475


 - [ ] ID-102
Reentrancy in [HoldEarn._getReward(uint256)](backend/app/Downloads/Smart.sol#L1669-L1708):
	External calls:
	- [_transferOut(msg.sender,rewardTokenInfo[pID][tID].rewardToken,sReward)](backend/app/Downloads/Smart.sol#L1681)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	- [_transferOut(msg.sender,rewardTokenInfo[pID][tID_scope_0].rewardToken,bReward)](backend/app/Downloads/Smart.sol#L1693)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	External calls sending eth:
	- [_transferOut(msg.sender,rewardTokenInfo[pID][tID].rewardToken,sReward)](backend/app/Downloads/Smart.sol#L1681)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	- [_transferOut(msg.sender,rewardTokenInfo[pID][tID_scope_0].rewardToken,bReward)](backend/app/Downloads/Smart.sol#L1693)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	State variables written after the call(s):
	- [j < rewardID[pID].length()](backend/app/Downloads/Smart.sol#L1687)
	- [userBet[msg.sender][pID].bTid.push(tID_scope_0)](backend/app/Downloads/Smart.sol#L1691)
	- [userReward[msg.sender][pID][tID_scope_0].claimBase = bReward](backend/app/Downloads/Smart.sol#L1690)
	Event emitted after the call(s):
	- [ClaimBaseReward(msg.sender,rewardTokenInfo[pID][tID_scope_0].rewardToken,pID,tID_scope_0,bReward)](backend/app/Downloads/Smart.sol#L1695)

backend/app/Downloads/Smart.sol#L1669-L1708


 - [ ] ID-103
Reentrancy in [HoldEarn._periodPrize(uint256,bool)](backend/app/Downloads/Smart.sol#L1506-L1545):
	External calls:
	- [_transferOut(proAddress,rewardTokenInfo[pID][tID_scope_1].rewardToken,rewardTokenInfo[pID][tID_scope_1].totalAmount)](backend/app/Downloads/Smart.sol#L1523)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	External calls sending eth:
	- [_transferOut(proAddress,rewardTokenInfo[pID][tID_scope_1].rewardToken,rewardTokenInfo[pID][tID_scope_1].totalAmount)](backend/app/Downloads/Smart.sol#L1523)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	State variables written after the call(s):
	- [returnRewardAmount[pID][tID_scope_1] = rewardTokenInfo[pID][tID_scope_1].totalAmount](backend/app/Downloads/Smart.sol#L1522)

backend/app/Downloads/Smart.sol#L1506-L1545


 - [ ] ID-104
Reentrancy in [HoldEarn._periodPrize(uint256,bool)](backend/app/Downloads/Smart.sol#L1506-L1545):
	External calls:
	- [_transferOut(proAddress,periodInfo[pID].defaultToken,periodState[pID].totalDefaultAmount)](backend/app/Downloads/Smart.sol#L1512)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	External calls sending eth:
	- [_transferOut(proAddress,periodInfo[pID].defaultToken,periodState[pID].totalDefaultAmount)](backend/app/Downloads/Smart.sol#L1512)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	State variables written after the call(s):
	- [rewardTokenInfo[pID][tID].perAmount = rewardTokenInfo[pID][tID].totalAmount.mul(muti).div(periodState[pID].totalAmount)](backend/app/Downloads/Smart.sol#L1516)

backend/app/Downloads/Smart.sol#L1506-L1545


 - [ ] ID-105
Reentrancy in [HoldEarn.update(uint256)](backend/app/Downloads/Smart.sol#L1477-L1504):
	External calls:
	- [_periodPrize(pID,true)](backend/app/Downloads/Smart.sol#L1491)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	External calls sending eth:
	- [_periodPrize(pID,true)](backend/app/Downloads/Smart.sol#L1491)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	Event emitted after the call(s):
	- [PeriodUpdate(pID)](backend/app/Downloads/Smart.sol#L1493)

backend/app/Downloads/Smart.sol#L1477-L1504


 - [ ] ID-106
Reentrancy in [HoldEarn._periodPrize(uint256,bool)](backend/app/Downloads/Smart.sol#L1506-L1545):
	External calls:
	- [_transferOut(proAddress,rewardTokenInfo[pID][tID_scope_1].rewardToken,rewardTokenInfo[pID][tID_scope_1].totalAmount)](backend/app/Downloads/Smart.sol#L1523)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	- [_transferOut(proAddress,rewardTokenInfo[pID][tID_scope_3].rewardToken,rewardTokenInfo[pID][tID_scope_3].totalAmount)](backend/app/Downloads/Smart.sol#L1529)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	External calls sending eth:
	- [_transferOut(proAddress,rewardTokenInfo[pID][tID_scope_1].rewardToken,rewardTokenInfo[pID][tID_scope_1].totalAmount)](backend/app/Downloads/Smart.sol#L1523)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	- [_transferOut(proAddress,rewardTokenInfo[pID][tID_scope_3].rewardToken,rewardTokenInfo[pID][tID_scope_3].totalAmount)](backend/app/Downloads/Smart.sol#L1529)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	State variables written after the call(s):
	- [returnDefaultAmount[pID] = periodState[pID].totalDefaultAmount](backend/app/Downloads/Smart.sol#L1534)
	- [returnDefaultAmount[pID] = value](backend/app/Downloads/Smart.sol#L1540)
	- [returnRewardAmount[pID][tID_scope_3] = rewardTokenInfo[pID][tID_scope_3].totalAmount](backend/app/Downloads/Smart.sol#L1528)

backend/app/Downloads/Smart.sol#L1506-L1545


 - [ ] ID-107
Reentrancy in [HoldEarn.transferTo(address,address,uint256)](backend/app/Downloads/Smart.sol#L1442-L1454):
	External calls:
	- [address(account).transfer(amount)](backend/app/Downloads/Smart.sol#L1450)
	Event emitted after the call(s):
	- [TransferTo(address(token),account,amount)](backend/app/Downloads/Smart.sol#L1453)

backend/app/Downloads/Smart.sol#L1442-L1454


 - [ ] ID-108
Reentrancy in [HoldEarn._getReward(uint256)](backend/app/Downloads/Smart.sol#L1669-L1708):
	External calls:
	- [_transferOut(msg.sender,periodInfo[pID].defaultToken,periodInfo[pID].perDefaultAmount)](backend/app/Downloads/Smart.sol#L1700)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	External calls sending eth:
	- [_transferOut(msg.sender,periodInfo[pID].defaultToken,periodInfo[pID].perDefaultAmount)](backend/app/Downloads/Smart.sol#L1700)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	Event emitted after the call(s):
	- [ClaimDefaultReward(msg.sender,periodInfo[pID].defaultToken,pID,periodInfo[pID].perDefaultAmount)](backend/app/Downloads/Smart.sol#L1701)

backend/app/Downloads/Smart.sol#L1669-L1708


 - [ ] ID-109
Reentrancy in [HoldEarn._getReward(uint256)](backend/app/Downloads/Smart.sol#L1669-L1708):
	External calls:
	- [_transferOut(msg.sender,rewardTokenInfo[pID][tID].rewardToken,sReward)](backend/app/Downloads/Smart.sol#L1681)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	External calls sending eth:
	- [_transferOut(msg.sender,rewardTokenInfo[pID][tID].rewardToken,sReward)](backend/app/Downloads/Smart.sol#L1681)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	State variables written after the call(s):
	- [userBet[msg.sender][pID].sTid.push(tID)](backend/app/Downloads/Smart.sol#L1679)
	- [userReward[msg.sender][pID][tID].claimSort = sReward](backend/app/Downloads/Smart.sol#L1678)
	Event emitted after the call(s):
	- [ClaimSortReward(msg.sender,rewardTokenInfo[pID][tID].rewardToken,pID,tID,sReward)](backend/app/Downloads/Smart.sol#L1682)

backend/app/Downloads/Smart.sol#L1669-L1708


 - [ ] ID-110
Reentrancy in [HoldEarn.setDefaultToken(uint256,address,uint256)](backend/app/Downloads/Smart.sol#L1392-L1406):
	External calls:
	- [_transferOut(msg.sender,periodInfo[pID].defaultToken,beforeAmount)](backend/app/Downloads/Smart.sol#L1395)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	External calls sending eth:
	- [_transferOut(msg.sender,periodInfo[pID].defaultToken,beforeAmount)](backend/app/Downloads/Smart.sol#L1395)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	- [_transferIn(msg.sender,token,afterAmount)](backend/app/Downloads/Smart.sol#L1398)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
	State variables written after the call(s):
	- [periodInfo[pID].defaultToken = token](backend/app/Downloads/Smart.sol#L1403)
	- [periodInfo[pID].perDefaultAmount = perAmount](backend/app/Downloads/Smart.sol#L1404)
	- [periodState[pID].totalDefaultAmount = afterAmount](backend/app/Downloads/Smart.sol#L1405)

backend/app/Downloads/Smart.sol#L1392-L1406


 - [ ] ID-111
Reentrancy in [HoldEarn.update(uint256)](backend/app/Downloads/Smart.sol#L1477-L1504):
	External calls:
	- [_periodPrize(pID,false)](backend/app/Downloads/Smart.sol#L1499)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	External calls sending eth:
	- [_periodPrize(pID,false)](backend/app/Downloads/Smart.sol#L1499)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	Event emitted after the call(s):
	- [PeriodUpdate(pID)](backend/app/Downloads/Smart.sol#L1501)

backend/app/Downloads/Smart.sol#L1477-L1504


 - [ ] ID-112
Reentrancy in [HoldEarn.setRewardToken(uint256,uint256,address,uint256,uint256)](backend/app/Downloads/Smart.sol#L1321-L1368):
	External calls:
	- [_transferOut(msg.sender,rToken,amount)](backend/app/Downloads/Smart.sol#L1349)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	External calls sending eth:
	- [_transferOut(msg.sender,rToken,amount)](backend/app/Downloads/Smart.sol#L1349)
		- [(success,returndata) = target.call{value: value}(data)](backend/app/Downloads/Smart.sol#L258)
		- [address(user).transfer(amount)](backend/app/Downloads/Smart.sol#L2019)
	Event emitted after the call(s):
	- [ChangeToken(pID,tID,rToken,token,amount,tokenAmount,tType)](backend/app/Downloads/Smart.sol#L1365)

backend/app/Downloads/Smart.sol#L1321-L1368


 - [ ] ID-113
Reentrancy in [HoldEarn.removeToken(uint256,uint256)](backend/app/Downloads/Smart.sol#L1302-L1319):
	External calls:
	- [address(msg.sender).transfer(rewardTokenInfo[pID][tID].totalAmount)](backend/app/Downloads/Smart.sol#L1315)
	Event emitted after the call(s):
	- [RemoveToken(rewardTokenInfo[pID][tID].rewardToken,rewardTokenInfo[pID][tID].totalAmount,pID,tID)](backend/app/Downloads/Smart.sol#L1318)

backend/app/Downloads/Smart.sol#L1302-L1319


## similar-names
Impact: Informational
Confidence: Medium
 - [ ] ID-114
Variable [HoldEarn._periodPrize(uint256,bool).tID_scope_1](backend/app/Downloads/Smart.sol#L1521) is too similar to [HoldEarn._periodPrize(uint256,bool).tID_scope_3](backend/app/Downloads/Smart.sol#L1527)

backend/app/Downloads/Smart.sol#L1521


 - [ ] ID-115
Variable [HoldEarn._getReward(uint256).tID_scope_0](backend/app/Downloads/Smart.sol#L1688) is too similar to [HoldEarn._periodPrize(uint256,bool).tID_scope_1](backend/app/Downloads/Smart.sol#L1521)

backend/app/Downloads/Smart.sol#L1688


 - [ ] ID-116
Variable [HoldEarn._getReward(uint256).tID_scope_0](backend/app/Downloads/Smart.sol#L1688) is too similar to [HoldEarn._periodPrize(uint256,bool).tID_scope_3](backend/app/Downloads/Smart.sol#L1527)

backend/app/Downloads/Smart.sol#L1688


## unused-state
Impact: Informational
Confidence: High
 - [ ] ID-117
[Operator.baseRate](backend/app/Downloads/Smart.sol#L1081) is never used in [HoldEarn](backend/app/Downloads/Smart.sol#L1103-L2052)

backend/app/Downloads/Smart.sol#L1081


